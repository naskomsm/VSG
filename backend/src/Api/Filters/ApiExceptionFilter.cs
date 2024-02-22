namespace Api.Filters
{
    using System;
    using Application.Common.Exceptions;
    using Application.Common.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;

    public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
    {
        private readonly IDictionary<Type, Action<ExceptionContext>> _exceptionHandlers;

        public ApiExceptionFilterAttribute()
        {
            // Register known exception types and handlers.
            _exceptionHandlers = new Dictionary<Type, Action<ExceptionContext>>
            {
                 { typeof(NotFoundException), HandleNotFoundException },
                 { typeof(ExistsException), HandleExistsException },
                 { typeof(CustomValidationException), HandleCustomValidationException }
            };
        }

        public override void OnException(ExceptionContext context)
        {
            HandleException(context);
        }

        private void HandleException(ExceptionContext context)
        {
            Type type = context.Exception.GetType();
            if (_exceptionHandlers.TryGetValue(type, out var value))
            {
                value.Invoke(context);
                return;
            }
            else
            {
                HandleUnknownException(context);
            }
        }

        private static void HandleCustomValidationException(ExceptionContext context)
        {
            var exception = (CustomValidationException)context.Exception;
            var errorObjectResult = new ErrorObjectResult("https://tools.ietf.org/html/rfc7231#section-6.5.1", "One or more validation errors occurred.", 400)
            {
                Errors = exception.Errors
            };

            context.Result = new ObjectResult(errorObjectResult);
            context.ExceptionHandled = true;
        }

        private static void HandleExistsException(ExceptionContext context)
        {
            var exception = (ExistsException)context.Exception;

            var errorObjectResult = new ErrorObjectResult("https://tools.ietf.org/html/rfc7231#section-6.5.8", $"{exception.EntityType.ToString().Split(".").Last()} already exists.", 409);

            context.Result = new NotFoundObjectResult(errorObjectResult);
            context.ExceptionHandled = true;
        }

        private static void HandleNotFoundException(ExceptionContext context)
        {
            var exception = (NotFoundException)context.Exception;

            var errorObjectResult = new ErrorObjectResult("https://tools.ietf.org/html/rfc7231#section-6.5.4", $"{exception.EntityType.ToString().Split(".").Last()} not found.", 404);

            context.Result = new NotFoundObjectResult(errorObjectResult);
            context.ExceptionHandled = true;
        }

        private static void HandleUnknownException(ExceptionContext context)
        {
            var errorObjectResult = new ErrorObjectResult("https://tools.ietf.org/html/rfc7231#section-6.6.1", "Something went wrong.", 500);

            context.Result = new ObjectResult(errorObjectResult)
            {
                StatusCode = 500
            };

            context.ExceptionHandled = true;
        }
    }
}
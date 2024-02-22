namespace Application.Common.Exceptions
{
    public class CustomValidationException(IDictionary<string, IList<string>> errors) : Exception
    {
        public IDictionary<string, IList<string>> Errors { get; private set; } = errors;
    }
}
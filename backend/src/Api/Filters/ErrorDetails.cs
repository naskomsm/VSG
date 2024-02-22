namespace Api.Filters
{
    internal class ErrorDetails(string message)
    {
        public string Message { get; } = message;
    }
}
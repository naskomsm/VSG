namespace Domain.Entities.Base
{
    using System;
    using MediatR;

    public class BaseEvent(string payload, string requestType) : INotification
    {
        public Guid Id { get; private set; } = Guid.NewGuid();

        public string RequestType { get; set; } = requestType;

        public string Payload { get; set; } = payload;

        public DateTime CreatedAt { get; private set; } = DateTime.Now;
    }
}
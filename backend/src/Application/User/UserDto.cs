namespace Application.User
{
    public record UserDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
    }
}
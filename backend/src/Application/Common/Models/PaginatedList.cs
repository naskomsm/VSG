namespace Application.Common.Models
{
    using System.ComponentModel.DataAnnotations;
    using Microsoft.EntityFrameworkCore;

    public class PaginatedList<T>(List<T> items, int count, int pageNumber, int pageSize)
    {
        [Required]
        public List<T> Items { get; } = items;

        [Required]
        public int PageNumber { get; } = pageNumber;

        [Required]
        public int TotalPages { get; } = (int)Math.Ceiling(count / (double)pageSize);

        [Required]
        public int TotalCount { get; } = count;

        [Required]
        public bool HasPreviousPage => PageNumber > 1;

        [Required]
        public bool HasNextPage => PageNumber < TotalPages;

        public static PaginatedList<T> Create(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            return new PaginatedList<T>(items, count, pageNumber, pageSize);
        }

        public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PaginatedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
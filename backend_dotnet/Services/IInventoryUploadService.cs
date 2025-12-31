namespace GrocerApi.Services;

public interface IInventoryUploadService
{
    Task<(bool Success, string Message, int ProcessedCount)> ProcessCsvAsync(Stream csvStream);
}

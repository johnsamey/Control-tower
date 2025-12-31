using System.Globalization;
using GrocerApi.DTOs;

namespace GrocerApi.Services;

public class InventoryUploadService : IInventoryUploadService
{
    private readonly ILogger<InventoryUploadService> _logger;

    public InventoryUploadService(ILogger<InventoryUploadService> logger)
    {
        _logger = logger;
    }

    public async Task<(bool Success, string Message, int ProcessedCount)> ProcessCsvAsync(Stream csvStream)
    {
        try
        {
            var items = new List<InventoryItemDto>();
            using var reader = new StreamReader(csvStream);
            
            // Read header line
            var headerLine = await reader.ReadLineAsync();
            if (string.IsNullOrWhiteSpace(headerLine))
            {
                return (false, "CSV file is empty", 0);
            }

            var headers = headerLine.Split(',');
            
            // Validate headers
            var expectedHeaders = new[] 
            { 
                "sku", "MacroCategory", "Category", "MicroCategory", "Department",
                "start_date", "end_date", "campaign_Status", "discounted_price",
                "max_no_of_orders", "price", "_Availability"
            };

            if (!ValidateHeaders(headers, expectedHeaders))
            {
                return (false, "CSV headers do not match expected format", 0);
            }

            int lineNumber = 1;
            while (!reader.EndOfStream)
            {
                lineNumber++;
                var line = await reader.ReadLineAsync();
                if (string.IsNullOrWhiteSpace(line)) continue;

                try
                {
                    var item = ParseCsvLine(line);
                    items.Add(item);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning($"Error parsing line {lineNumber}: {ex.Message}");
                }
            }

            // Here you would typically save to database
            // For now, we'll just log the count
            _logger.LogInformation($"Successfully processed {items.Count} inventory items");

            return (true, $"Successfully processed {items.Count} items", items.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing CSV file");
            return (false, $"Error processing CSV: {ex.Message}", 0);
        }
    }

    private bool ValidateHeaders(string[] actualHeaders, string[] expectedHeaders)
    {
        if (actualHeaders.Length != expectedHeaders.Length)
            return false;

        for (int i = 0; i < expectedHeaders.Length; i++)
        {
            if (!actualHeaders[i].Trim().Equals(expectedHeaders[i], StringComparison.OrdinalIgnoreCase))
                return false;
        }

        return true;
    }

    private InventoryItemDto ParseCsvLine(string line)
    {
        var values = line.Split(',');
        
        return new InventoryItemDto
        {
            Sku = values[0].Trim(),
            MacroCategory = values[1].Trim(),
            Category = values[2].Trim(),
            MicroCategory = values[3].Trim(),
            Department = values[4].Trim(),
            StartDate = values[5].Trim(),
            EndDate = values[6].Trim(),
            CampaignStatus = int.TryParse(values[7].Trim(), out var cs) ? cs : 0,
            DiscountedPrice = decimal.TryParse(values[8].Trim(), NumberStyles.Any, CultureInfo.InvariantCulture, out var dp) ? dp : 0,
            MaxNoOfOrders = values[9].Trim(),
            Price = decimal.TryParse(values[10].Trim(), NumberStyles.Any, CultureInfo.InvariantCulture, out var p) ? p : 0,
            Availability = int.TryParse(values[11].Trim(), out var av) ? av : 0
        };
    }
}

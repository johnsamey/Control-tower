namespace GrocerApi.DTOs;

public class InventoryItemDto
{
    public string Sku { get; set; } = string.Empty;
    public string MacroCategory { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string MicroCategory { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string StartDate { get; set; } = string.Empty;
    public string EndDate { get; set; } = string.Empty;
    public int CampaignStatus { get; set; }
    public decimal DiscountedPrice { get; set; }
    public string MaxNoOfOrders { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Availability { get; set; }
}

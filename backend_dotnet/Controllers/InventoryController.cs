using Microsoft.AspNetCore.Mvc;
using GrocerApi.Services;

namespace GrocerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InventoryController : ControllerBase
{
    private readonly IInventoryUploadService _uploadService;
    private readonly ILogger<InventoryController> _logger;

    public InventoryController(
        IInventoryUploadService uploadService,
        ILogger<InventoryController> logger)
    {
        _uploadService = uploadService;
        _logger = logger;
    }

    [HttpPost("upload-csv")]
    public async Task<IActionResult> UploadCsv(IFormFile file)
    {
        try
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "No file uploaded" });
            }

            if (!file.FileName.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new { message = "File must be a CSV" });
            }

            using var stream = file.OpenReadStream();
            var (success, message, processedCount) = await _uploadService.ProcessCsvAsync(stream);

            if (success)
            {
                return Ok(new 
                { 
                    message = message,
                    processedCount = processedCount,
                    fileName = file.FileName
                });
            }
            else
            {
                return BadRequest(new { message = message });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading CSV file");
            return StatusCode(500, new { message = "Error uploading file", details = ex.Message });
        }
    }
}

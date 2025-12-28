using Microsoft.AspNetCore.Mvc;
using GrocerApi.Services;

namespace GrocerApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HierarchyController : ControllerBase
{
    private readonly IHierarchyService _hierarchyService;

    public HierarchyController(IHierarchyService hierarchyService)
    {
        _hierarchyService = hierarchyService;
    }

    [HttpGet]
    public async Task<IActionResult> GetHierarchy()
    {
        try
        {
            var hierarchy = await _hierarchyService.GetNestedHierarchyAsync();
            return Ok(hierarchy);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error fetching hierarchy", details = ex.Message });
        }
    }
}

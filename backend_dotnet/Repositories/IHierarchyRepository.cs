namespace GrocerApi.Repositories;

public interface IHierarchyRepository
{
    Task<IEnumerable<HierarchyRow>> GetHierarchyRowsAsync();
}

public class HierarchyRow
{
    public string? MacroCategory { get; set; }
    public string? MacroCategoryL { get; set; }
    public string? Category { get; set; }
    public string? CategoryL { get; set; }
    public string? MicroCategory { get; set; }
    public string? MicroCategoryL { get; set; }
    public string? Department { get; set; }
    public string? DepartmentL { get; set; }
}

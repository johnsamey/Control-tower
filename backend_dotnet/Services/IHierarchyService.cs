namespace GrocerApi.Services;

public interface IHierarchyService
{
    Task<Dictionary<string, Dictionary<string, Dictionary<string, List<string>>>>> GetNestedHierarchyAsync();
}

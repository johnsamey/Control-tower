using GrocerApi.Repositories;

namespace GrocerApi.Services;

public class HierarchyService : IHierarchyService
{
    private readonly IHierarchyRepository _repository;

    public HierarchyService(IHierarchyRepository repository)
    {
        _repository = repository;
    }

    public async Task<Dictionary<string, Dictionary<string, Dictionary<string, List<string>>>>> GetNestedHierarchyAsync()
    {
        var rows = await _repository.GetHierarchyRowsAsync();
        var hierarchy = new Dictionary<string, Dictionary<string, Dictionary<string, List<string>>>>();

        foreach (var row in rows)
        {
            var macro = row.MacroCategory ?? "Unknown";
            var category = row.Category ?? "Unknown";
            var micro = row.MicroCategory ?? "Unknown";
            var department = row.Department ?? "Unknown";

            if (!hierarchy.ContainsKey(macro))
                hierarchy[macro] = new Dictionary<string, Dictionary<string, List<string>>>();

            if (!hierarchy[macro].ContainsKey(category))
                hierarchy[macro][category] = new Dictionary<string, List<string>>();

            if (!hierarchy[macro][category].ContainsKey(micro))
                hierarchy[macro][category][micro] = new List<string>();

            if (!hierarchy[macro][category][micro].Contains(department))
                hierarchy[macro][category][micro].Add(department);
        }

        return hierarchy;
    }
}

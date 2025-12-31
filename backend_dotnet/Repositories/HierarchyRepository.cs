using Microsoft.Data.SqlClient;
using GrocerApi.Repositories;

namespace GrocerApi.Repositories;

public class HierarchyRepository : IHierarchyRepository
{
    private readonly string _connectionString;

    public HierarchyRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found in configuration.");
    }


    public async Task<IEnumerable<HierarchyRow>> GetHierarchyRowsAsync()
    {
        var rows = new List<HierarchyRow>();

        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();

        var query = @"
            select c.a_name,c.l_name,s.a_name,s.l_name,g.a_name,g.l_name,sg.a_name,sg.l_name
            from sys_itemclass c
            Join sys_section s on s.itemClass = c.itemclass
            JOIN sys_group g on g.section = s.section
            JOIN sys_subgroup sg on sg.itemgroup = g.itemgroup";

        using var command = new SqlCommand(query, connection);
        using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            rows.Add(new HierarchyRow
            {
                MacroCategory = reader.IsDBNull(0) ? null : reader.GetString(0),
                MacroCategoryL = reader.IsDBNull(1) ? null : reader.GetString(1),
                Category = reader.IsDBNull(2) ? null : reader.GetString(2),
                CategoryL = reader.IsDBNull(3) ? null : reader.GetString(3),
                MicroCategory = reader.IsDBNull(4) ? null : reader.GetString(4),
                MicroCategoryL = reader.IsDBNull(5) ? null : reader.GetString(5),
                Department = reader.IsDBNull(6) ? null : reader.GetString(6),
                DepartmentL = reader.IsDBNull(7) ? null : reader.GetString(7)
            });
        }

        return rows;
    }
}

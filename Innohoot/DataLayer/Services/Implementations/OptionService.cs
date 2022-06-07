using Innohoot.Models.Activity;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class OptionService:CRUDService<Option>, IOptionService
	{
		public OptionService(IDBRepository repository) : base(repository) { }
		public async Task<List<Option>?> GetAllOptionsByPollId(Guid pollId)
		{
			return await _db.GetAll<Option>().Where(o=> o.PollId.Equals(pollId)).ToListAsync();
		}
	}
}

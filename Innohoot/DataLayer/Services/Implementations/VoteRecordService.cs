using Innohoot.Models.ElementsForPA;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public class VoteRecordService : CRUDService<VoteRecord>, IVoteRecordService
	{
		public VoteRecordService(IDBRepository repository) : base(repository) { }

		public async Task<List<VoteRecord>?> GetAllVoteRecordByChosenOptionId(Guid optionId)
		{
			return await _db.GetAll<VoteRecord>().Where(v => v.ChosenOption.Equals(optionId)).ToListAsync();
		}
	}
}

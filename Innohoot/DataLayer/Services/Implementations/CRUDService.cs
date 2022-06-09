using Innohoot.DTO;
using Innohoot.Models;
using Innohoot.Models.Activity;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer.Services.Implementations
{
	public abstract class CRUDService<T> where T : class, IEntity 
	{
		protected readonly IDBRepository _db;
		public CRUDService(IDBRepository repository)
		{
			_db = repository;
		}
		public async Task<Guid> Create(T entity)
		{
			await _db.Add<T>(entity);
			await _db.Save();
			return entity.Id;
		}
		public async Task Delete(Guid entityId)
		{
			await _db.Delete<T>(entityId);
			await _db.Save();
		}

		public async Task<T?> Get(Guid entityId)
		{
			return await _db.Get<T>(entityId).FirstOrDefaultAsync();
		}

		public async Task Update(T entity)
		{
			await _db.Update(entity);
			await _db.Save();
		}
	}
}

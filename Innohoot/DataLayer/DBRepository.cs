using System.Linq.Expressions;
using Innohoot.Models;
using Microsoft.EntityFrameworkCore;

namespace Innohoot.DataLayer
{
	public class DBRepository : IDBRepository
	{
		private readonly ApplicationContext _db;

		public DBRepository(ApplicationContext context)
		{
			_db = context;
		}
		public async Task<T> Delete<T>(T item) where T : class, IEntity
		{
			await Task.Run(() => _db.Set<T>().Remove(item));
			return item;
		}
		public async Task<T> Delete<T>(Guid id) where T : class, IEntity
		{
			var entity = await _db.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
			if (entity != null) await Task.Run(() => _db.Set<T>().Remove(entity));
			return entity;
		}
		public void Dispose()
		{
		}

		public IQueryable<T> Get<T>(Guid id) where T : class, IEntity
		{
			return _db.Set<T>().Where(x => x.Id == id).AsQueryable();

		}

		public IQueryable<T> Get<T>(Expression<Func<T, bool>> selector) where T : class, IEntity
		{
			return _db.Set<T>().Where(selector).AsQueryable();
		}

		public IQueryable<T> GetAll<T>() where T : class, IEntity
		{
			return _db.Set<T>().AsQueryable();
		}

		public async Task<T> Update<T>(T item) where T : class, IEntity
		{
			var a = await Task.Run(() => _db.Set<T>().Update(item));
			return item;
		}

		public async Task<Guid> Add<T>(T item) where T : class, IEntity
		{
			var entity = await _db.Set<T>().AddAsync(item);
			return entity.Entity.Id;
		}

		public async Task<int> Save()
		{
			return await _db.SaveChangesAsync();
		}


	}
}

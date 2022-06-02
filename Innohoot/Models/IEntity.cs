using System.ComponentModel.DataAnnotations;

namespace Innohoot.Models
{
	public interface IEntity
	{
		[Key]
		public Guid Id { get; set; }
	}
}

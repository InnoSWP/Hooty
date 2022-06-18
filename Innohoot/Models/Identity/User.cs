using System.ComponentModel.DataAnnotations;

using Innohoot.Models.Activity;

namespace Innohoot.Models.Identity
{
	public class User : IEntity
	{
		public Guid Id { get; set; }

		[Required]
		public string Login { get; set; }

		[Required]
		public string PasswordHash { get; set; }

		public List<Session> Sessions { get; set; }
	}
}

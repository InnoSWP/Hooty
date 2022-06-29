using System.ComponentModel.DataAnnotations;

namespace Innohoot.Models.Activity
{
	public class Option : IEntity
	{
		public Guid Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public Guid PollId { get; set; }
		[Required]
		public Poll Poll { get; set; }
		public bool IsAnswer { get; set; } = false;
	}
}

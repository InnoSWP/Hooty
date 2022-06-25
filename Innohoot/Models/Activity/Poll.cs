using Innohoot.Models.ElementsForPA;
using System.ComponentModel.DataAnnotations;

namespace Innohoot.Models.Activity
{
	public class Poll : IEntity
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string? Description { get; set; }
		[Required]
		public Guid PollCollectionId { get; set; }
		[Required]
		public PollCollection PollCollection { get; set; }
		public List<Option> Options { get; set; }
		public List<Guid>? AnswerId { get; set; }
	}
}

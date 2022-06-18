using Innohoot.Models.Activity;
using System.ComponentModel.DataAnnotations;

namespace Innohoot.Models.ElementsForPA
{
	/// <summary>
	///  record of every given answer
	/// </summary>
	public class VoteRecord : IEntity
	{
		public Guid Id { get; set; }
		[Required]
		public string ParticipantName { get; set; }
		public Guid OptionId { get; set; }
		public Option Option { get; set; }
		public Guid SessionId { get; set; }
		public Session Session { get; set; }
	}
}

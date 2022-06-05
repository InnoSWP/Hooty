using Innohoot.Models.Activity;
using Innohoot.Models.Identity;

namespace Innohoot.Models.ElementsForPA
{
	/// <summary>
	///  record of every given answer
	/// </summary>
	public class VoteRecord:IEntity
	{
		public Guid Id { get; set; }
		public string ParticipantName { get; set; }
		public Option? ChosenOption { get; set; }
	}
}

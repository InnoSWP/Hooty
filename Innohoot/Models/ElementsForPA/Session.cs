using System.ComponentModel.DataAnnotations;
using Innohoot.Models.ElementsForPA;
using Innohoot.Models.Identity;

namespace Innohoot.Models.Activity
{
	/// <summary>
	/// Collection of polls that will be used in a teacher personal account,  Session is distinguishable by the time of the event
	/// </summary>
	public class Session : IEntity
	{
		public Guid Id { get; set; }
		/// <summary>
		/// Alternate key for find session in database. It's temporary and needed to be delete after cloasing of the session 
		/// </summary>
		public string? AccessCode { get; set; }

		[Required]
		public Guid UserId { get; set; }
		public User User { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		public DateTime Created { get; set; }

		[Required]
		public DateTime? StarTime { get; set; }

		public TimeSpan? Duration { get; set; }

		[Required]
		public Guid PollCollectionId { get; set; }
		public PollCollection? PollCollection { get; set; }

		public List<VoteRecord> VoteRecords { get; set; } = new List<VoteRecord>();

		[Required]
		public bool IsActive { get; set; } = false;

		public Guid? ActivePollId { get; set; } 
		public Poll? ActivePoll { get; set; } = null;
	}
}

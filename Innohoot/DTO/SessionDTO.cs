namespace Innohoot.DTO
{
	/// <summary>
	/// Collection of polls that will be used in a teacher personal account,  Session is distinguishable by the time of the event
	/// </summary>
	public class SessionDTO
	{
		public Guid Id { get; set; }
		/// <summary>
		/// Alternate key for find session in database. It's temporary and needed to be delete after cloasing of the session 
		/// </summary>
		public string? AccessCode { get; set; }
		public Guid UserId { get; set; }
		public string Name { get; set; }
		public DateTime Created { get; set; }
		public DateTime? StarTime { get; set; }
		public TimeSpan? Duration { get; set; }
		public Guid PollCollectionId { get; set; }
		public bool IsActive { get; set; } = false;
		public Guid? ActivePollId { get; set; }
		public List<Guid> ShowResultPoll { get; set; } = new List<Guid>();
	}
}

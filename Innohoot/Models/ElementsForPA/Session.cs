﻿using Innohoot.Models.ElementsForPA;
using Innohoot.Models.Identity;

namespace Innohoot.Models.Activity
{
	/// <summary>
	/// Collection of polls that will be used in a teacher personal account,  Session is distinguishable by the time of the event
	/// </summary>
	public class Session:IEntity
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public User User { get; set; }
		public string Name { get; set; }
		public string? Description { get; set; }
		public DateTime Created { get; set; }
		public DateTime? StarTime	{ get; set; }
		public TimeSpan? Duration { get; set; }
		public bool Available { get; set; } = false;
		public List<Poll> Polls { get; set; }
		public List<VoteRecord> VoteRecords { get; set; }

	}
}

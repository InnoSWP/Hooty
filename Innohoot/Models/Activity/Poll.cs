﻿using System.ComponentModel.DataAnnotations;
using Innohoot.Models.ElementsForPA;
using Innohoot.Models.Identity;

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
	}
}

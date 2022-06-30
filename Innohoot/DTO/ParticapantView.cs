using Constants;

namespace Innohoot.DTO
{
	public class ParticapantView
	{
		public ParticipantActionEnum ActionEnum { get; set; } = ParticipantActionEnum.SubmitVote;
		public PollDTO Poll { get; set; }
		public Guid? ChosenOptionId { get; set; }
	}
}

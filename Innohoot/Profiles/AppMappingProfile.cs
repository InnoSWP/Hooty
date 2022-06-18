using AutoMapper;
using Innohoot.DTO;
using Innohoot.Models.Activity;
using Innohoot.Models.ElementsForPA;
using Innohoot.Models.Identity;

public class AppMappingProfile : Profile
{
	public AppMappingProfile()
	{
		CreateMap<User, UserDTO>().ReverseMap();
		CreateMap<PollCollection, PollCollectionDTO>().ReverseMap();
		CreateMap<Option, OptionDTO>().ReverseMap();
		CreateMap<Poll, PollDTO>().ReverseMap();
		CreateMap<VoteRecord, VoteRecordDTO>().ReverseMap();
		CreateMap<Session, SessionDTO>().ReverseMap();
	}
}

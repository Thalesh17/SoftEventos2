using System.Linq;
using AutoMapper;
using Projeto.API.Dtos;
using Projeto.Domain.Identity;
using Projeto.Domain.Models;

namespace Projeto.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Evento, EventoDTO>()
                .ForMember(dest => dest.Palestrantes, opt => {
                    opt.MapFrom(src => src.PalestranteEventos.Select(x => x.Palestrante).ToList());
                }).ReverseMap();;

            CreateMap<Palestrante, PalestranteDTO>()
            .ForMember(dest => dest.Eventos,  opt => {
                opt.MapFrom(src => src.PalestranteEventos.Select(x => x.Evento).ToList());
            });

            CreateMap<Lote, LoteDTO>().ReverseMap();
            
            CreateMap<RedeSocial, RedeSocialDTO>().ReverseMap();

            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}
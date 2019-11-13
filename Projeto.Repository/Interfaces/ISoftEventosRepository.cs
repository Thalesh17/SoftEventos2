using System.Threading.Tasks;
using Projeto.Domain.Models;

namespace Projeto.Repository.Interfaces
{
    public interface ISoftEventosRepository
    {
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         Task<bool> SaveChangesAsync();

         //Eventos
        Task<Evento[]> GetAllEventoByTema(string tema, bool includePalestrantes);
        Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);
        Task<Evento> GetEventoById(int eventoId, bool includePalestrantes);

        //Palestrantes
        Task<Palestrante[]> GetAllPalestranteAsyncByName(string name, bool includeEventos);
        Task<Palestrante> GetPalestranteAllAsync(int palestrateId, bool includeEventos);
    }
}
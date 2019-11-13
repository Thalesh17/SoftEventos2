using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Projeto.Domain.Models;
using Projeto.Repository.Data;
using Projeto.Repository.Interfaces;

namespace Projeto.Repository.Repository
{
    public class SoftEventosRepository : ISoftEventosRepository
    {
        private readonly SoftEventosContext _context;

        public SoftEventosRepository(SoftEventosContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        #region CRUD
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
        #endregion

    
        #region Evento
        public async Task<Evento[]> GetAllEventoByTema(string tema, bool includePalestrantes)
        {
             IQueryable<Evento> query = _context.Eventos
                    .Include(c => c.Lotes) 
                    .Include(c => c.RedesSociais);

            if(includePalestrantes)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(p => p.Palestrante);
            }

            query = query.AsNoTracking()
                .OrderByDescending(c => c.DataEvento)
                .Where(c => c.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventoAsync(bool includePalestrantes)
        {
            IQueryable<Evento> query = _context.Eventos
                    .Include(c => c.Lotes) 
                    .Include(c => c.RedesSociais);

            if(includePalestrantes)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(p => p.Palestrante);
            }

            query = query.AsNoTracking()
                    .OrderByDescending(c => c.DataEvento);

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventoById(int eventoId, bool includePalestrantes)
        {
           IQueryable<Evento> query = _context.Eventos
                    .Include(c => c.Lotes) 
                    .Include(c => c.RedesSociais);

            if(includePalestrantes)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(p => p.Palestrante);
            }

            query = query.AsNoTracking()
                .OrderByDescending(c => c.DataEvento)
                .Where(c => c.EventoId.Equals(eventoId));

            return await query.FirstOrDefaultAsync();
        }
        #endregion
        #region Palestrante
        public async Task<Palestrante[]> GetAllPalestranteAsyncByName(string name, bool includeEventos = false)
        {
             IQueryable<Palestrante> query = _context.Palestrantes
                    .Include(c => c.RedesSociais);

            if(includeEventos)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(p => p.Evento);
            }

            query = query.AsNoTracking().OrderBy(c => c.Nome).Where(c => c.Nome.ToLower().Contains(name.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestranteAllAsync(int palestranteId, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                    .Include(c => c.RedesSociais);

            if(includeEventos)
            {
                query = query
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(p => p.Evento);
            }

            query = query.AsNoTracking().OrderBy(c => c.Nome).Where(c => c.Id.Equals(palestranteId));

            return await query.FirstOrDefaultAsync();
        }
        #endregion
    }
}
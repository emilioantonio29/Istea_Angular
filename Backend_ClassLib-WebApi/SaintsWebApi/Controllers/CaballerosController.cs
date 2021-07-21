using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaintsClassLib;
using SaintsClassLib.Models;

namespace SaintsWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaballerosController : ControllerBase
    {
        private readonly CaballerosDbContext _context;
        public List<Caballero> Caballeros{get;set;} 
        public CaballerosController(CaballerosDbContext context)
        {
            _context = context;
        }

        // GET: api/Caballeros
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Caballero>>> GetCaballeros()
        {
            return await _context.Caballeros.ToListAsync();
        }

        // GET: api/Caballeros/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Caballero>> GetCaballero(int id)
        {
            var caballero = await _context.Caballeros.FindAsync(id);

            if (caballero == null)
            {
                return NotFound();
            }

            return caballero;
        }

        //GET: api/Caballeros/Oro
        // [HttpGet("{Type}")]
        // public async Task<IActionResult> GetCaballeroType(string Type)
        // {
        //     return await Type;
        // }
        
        //GET: api/Caballeros
        [HttpGet("cadena")]
        public async Task<ActionResult<IEnumerable<Caballero>>> GetCaballerosContain(string cadena)
        {
            var caballeros = await _context.Caballeros.Where(d => d.Type == cadena.ToLower()
                    || d.Name == cadena.ToLower()
                    || d.Constellation == cadena.ToLower()
                    || d.Saga == cadena.ToLower()
                    || d.Armor == cadena.ToLower()).ToListAsync();
            
            if (caballeros == null)
            {
                return NotFound();
            }
            return caballeros;
        }


        // PUT: api/Caballeros/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCaballero(int id, Caballero caballero)
        {
            if (id != caballero.Id)
            {
                return BadRequest();
            }

            _context.Entry(caballero).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CaballeroExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Caballeros
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Caballero>> PostCaballero(Caballero caballero)
        {
            _context.Caballeros.Add(caballero);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCaballero", new { id = caballero.Id }, caballero);
        }

        // DELETE: api/Caballeros/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCaballero(int id)
        {
            var caballero = await _context.Caballeros.FindAsync(id);
            if (caballero == null)
            {
                return NotFound();
            }

            _context.Caballeros.Remove(caballero);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CaballeroExists(int id)
        {
            return _context.Caballeros.Any(e => e.Id == id);
        }
    }
}

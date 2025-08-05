using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Practica1.Models;

namespace Practica1.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult VerPdf(string nombreArchivo)
        {
            var rutaPdf = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "pdfs", nombreArchivo);

            if (!System.IO.File.Exists(rutaPdf))
            {
                return NotFound();
            }

            return PhysicalFile(rutaPdf, "application/pdf");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

using System;
using System.Collections.Generic;

namespace EgyptianAPI.Models
{
    public partial class Categorium
    {
        public string Categoria { get; set; } = null!;
        public short? Amount { get; set; }
        public string? Name { get; set; }
    }
}

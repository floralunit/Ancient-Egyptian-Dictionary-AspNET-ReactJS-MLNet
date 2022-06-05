using System;
using System.Collections.Generic;

namespace EgyptianAPI.Models
{
    public partial class Pharaoh
    {
        public string Name { get; set; } = null!;
        public string? BirthName { get; set; }
        public string? BirthDescription { get; set; }
        public string? ThroneName { get; set; }
        public string? NebtyDescription { get; set; }
        public string? Dynasty { get; set; }
    }
}

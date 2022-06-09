using System;
using System.Collections.Generic;

namespace EgyptianAPI.Models
{
    public partial class Comment
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? QuestionId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public string? Username { get; set; }
        public string? Description { get; set; }
    }
}

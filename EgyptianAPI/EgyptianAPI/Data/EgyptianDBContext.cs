using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EgyptianAPI.Models
{
    public partial class EgyptianDBContext : DbContext
    {

        public EgyptianDBContext()
        {
        }

        public EgyptianDBContext(DbContextOptions<EgyptianDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Categorium> Categoria { get; set; } = null!;
        public virtual DbSet<Glyph> Glyphs { get; set; } = null!;
        public virtual DbSet<God> Gods { get; set; } = null!;
        public virtual DbSet<Pharaoh> Pharaohs { get; set; } = null!;
        public virtual DbSet<Phonogram> Phonograms { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categorium>(entity =>
            {
                entity.HasKey(e => e.Categoria)
                    .HasName("PK_Categoria_ru");

                entity.Property(e => e.Categoria)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Glyph>(entity =>
            {
                entity.HasKey(e => e.GardinerCode)
                    .HasName("PK_Dictionary");

                entity.ToTable("Glyph");

                entity.Property(e => e.GardinerCode)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Categoria)
                    .HasMaxLength(5)
                    .IsUnicode(false);

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.GlyphUnicode)
                    .HasMaxLength(10)
                    .HasColumnName("GlyphUnicode");

                entity.Property(e => e.Notes).HasMaxLength(500);

                entity.Property(e => e.Phonogram).HasMaxLength(255);

                entity.Property(e => e.Transliteration).HasMaxLength(255);

                entity.Property(e => e.UnicodeString).HasMaxLength(25);
            });

            modelBuilder.Entity<God>(entity =>
            {
                entity.HasKey(e => e.Name)
                .HasName("PK_God"); ;

                entity.ToTable("God");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.GardinerCode)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Hieroglyphic).HasMaxLength(50);

                entity.Property(e => e.Transliteration).HasMaxLength(50);

                entity.Property(e => e.Type).HasMaxLength(255);
            });

            modelBuilder.Entity<Pharaoh>(entity =>
            {
                entity.HasKey(e => e.Name);

                entity.ToTable("Pharaoh");

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.BirthDescription).HasMaxLength(255);

                entity.Property(e => e.BirthName).HasMaxLength(255);

                entity.Property(e => e.Dynasty).HasMaxLength(255);

                entity.Property(e => e.NebtyDescription).HasMaxLength(255);

                entity.Property(e => e.ThroneName).HasMaxLength(255);
            });

            modelBuilder.Entity<Phonogram>(entity =>
            {
                entity.ToTable("Phonogram");

                entity.Property(e => e.GardinerCode)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Glyph).HasMaxLength(10);

                entity.Property(e => e.ManuelCotage)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Transliteration).HasMaxLength(25);

                entity.Property(e => e.Type)
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });
        }
    }
}

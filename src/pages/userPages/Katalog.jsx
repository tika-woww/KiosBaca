import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../../components/BookCard";
import { books, genres } from "../../context/buku";

export default function Katalog() {
    const [params] = useSearchParams();
    const [cari, setCari] = useState(params.get('q') ?? '');
    const [genre, setGenre] = useState('');

    const hasil = books.filter(
        (b) => 
            (b.title + " " + b.author).toLowerCase().includes(cari.toLowerCase()) && 
            (genre === '' || b.genre === genre)
    );

    return (
      <div className="w-full">
        <h2 className="text-[26px] font-bold font-bricolage">Katalog buku</h2>

        <div className="my-5 flex flex-wrap gap-3">
          <input
            aria-label="Cari buku"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari judul atau penulis"
            className="min-w-[240px] flex-1 rounded-full border-[1.5px] border-line bg-surf px-[18px] py-2.5 font-poppins"
          />
          <select
            aria-label="Filter genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="rounded-full border-[1.5px] border-line bg-surf px-4 py-2.5 font-poppins"
          >
            <option value="">Semua genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {hasil.length === 0 ? (
          <p className="text-mut">
            Tidak ada buku yang cocok. Coba ubah kata kunci atau pilih genre
            lain.
          </p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[18px]">
            {hasil.map((b) => (
              <BookCard key={b.id} infoBook={b} />
            ))}
          </div>
        )}
      </div>
    );
}
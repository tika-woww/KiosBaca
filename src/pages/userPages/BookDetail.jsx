import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CardContext";
import { formatRupiah, getBook, reviews } from "../../context/buku";

export default function BookDetail() {
  const { id } = useParams();
  const book = getBook(id);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!book) {
    return (
      <div className="py-12 text-center font-poppins">
        <p className="text-lg">
          Buku tidak ditemukan.{" "}
          <Link to="/katalog" className="text-acc underline font-semibold">
            Kembali ke katalog
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-8">
      <div className="grid gap-8 md:grid-cols-[260px_1fr] items-start">

        <div className="flex justify-center md:justify-start">
          <div className="w-full max-w-[240px] md:max-w-[260px] aspect-[2/3] rounded-2xl overflow-hidden shadow-md">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-bricolage leading-tight">
            {book.title}
          </h1>

          <p className="my-2 text-xs sm:text-sm text-mut font-poppins">
            {book.author} · {book.pages} halaman · {book.genre}
          </p>

          <p className="text-xs sm:text-sm font-poppins flex items-center gap-1">
            <span className="text-acc2">★</span> {book.rating} dari{" "}
            {book.reviews?.toLocaleString("id-ID") ?? 0} ulasan
          </p>

          <p className="my-4 font-poppins text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {book.synopsis}
          </p>

          <div className="font-display text-2xl sm:text-3xl font-extrabold font-bricolage my-1">
            {formatRupiah(book.price)}
          </div>

          <div className="mb-7 mt-3.5 flex flex-wrap gap-3">
            <button
              onClick={() => {
                addToCart(book);
                setAdded(true);
              }}
              className={`cursor-pointer rounded-full border-[1.5px] border-line px-6 py-2.5 font-semibold text-sm font-poppins transition-all active:scale-95 ${
                added
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {added ? "Ditambahkan ✓" : "Tambah ke keranjang"}
            </button>
          </div>

          <div className="mt-2">
            <h3 className="mb-2.5 text-base sm:text-[17px] font-bold font-poppins">
              Baca contoh gratis · Bab 1
            </h3>
            <p className="border-l-[3px] border-acc2 py-1 pl-4 font-poppins text-xs sm:text-sm leading-relaxed text-mut italic">
              {book.sample}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-base sm:text-[17px] font-bold font-poppins">
              Ulasan pembaca
            </h3>
            <div className="space-y-3">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="rounded-2xl border border-line bg-surf p-4 font-poppins text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="tracking-widest text-acc2">
                      {"★".repeat(r.stars)}
                      {"☆".repeat(Math.max(0, 5 - r.stars))}
                    </span>
                    <b className="font-semibold">{r.name}</b>
                  </div>
                  <p className="text-mut leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import BookCard from "../../components/BookCard";
import { Link } from "react-router-dom";
import fotoBuku from "../../assets/Group 48.png";
import { books } from "../../context/buku";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8 pt-6 pb-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 font-bricolage leading-tight">
            Beli sekali, baca kapan saja.
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-[60ch] mb-6 font-poppins mx-auto md:mx-0">
            Ribuan e-book Indonesia dan terjemahan. Setiap menit membacamu
            tercatat, jadi kamu tahu sudah sejauh apa.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6 md:mb-0">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-[#E9C46A] text-[#3B2A0C] rounded-full px-6 py-3 hover:bg-white hover:border-2 hover:border-[#E9C46A] border-2 border-transparent transition-all duration-300 font-poppins"
            >
              Daftar Sekarang
            </Link>
            <Link
              to="/katalog"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#3B2A0C] border-2 border-[#E9C46A] rounded-full px-6 py-3 hover:bg-[#F4A261] hover:border-[#F4A261] hover:text-white transition-all duration-300 font-poppins"
            >
              Jelajahi Buku
            </Link>
          </div>
        </div>

        <div className="relative aspect-square max-w-[320px] sm:max-w-[380px] md:max-w-none mx-auto w-full flex items-center justify-center">
          <div className="relative w-full h-full rounded-t-[160px] sm:rounded-t-[200px] rounded-b-3xl bg-[#F7F1E3] dark:bg-slate-800 border-2 border-dashed border-[#E9C46A]/50 p-4 flex items-center justify-center overflow-hidden">
            <img
              src={fotoBuku}
              alt="Foto Buku"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <section className="mt-12 sm:mt-16">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold font-bricolage">
            Rilis terbaru
          </h2>
          <Link
            to="/katalog"
            className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#E9C46A] transition-colors font-poppins"
          >
            Lihat semua
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-4 lg:gap-4">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book.id} infoBook={book} />
          ))}
        </div>
      </section>

      <div className="mt-10 sm:mt-12 overflow-hidden rounded-xl sm:rounded-2xl shadow-sm">
        <img
          src="/diskon.jpg"
          alt="Diskon"
          className="w-full h-auto object-cover max-h-[240px] md:max-h-[320px]"
        />
      </div>

      <section className="mt-10 sm:mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold font-bricolage">
            Terlaris di KiosBaca
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-4 lg:gap-4">
          {books
            .filter((book) => book.sold > 1000)
            .slice(0, 6)
            .map((book) => (
              <BookCard key={book.id} infoBook={book} />
            ))}
        </div>
      </section>
    </div>
  );
}

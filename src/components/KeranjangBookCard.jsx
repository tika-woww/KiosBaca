import { formatRupiah } from "../context/buku";

export default function KeranjangBookCard({ item, onRemove }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3.5 border-b border-line py-3.5 last:border-0 sm:items-center">
      <div className="flex gap-3.5 flex-1 items-start sm:items-center">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <b className="font-bricolage block line-clamp-2 text-sm sm:text-base">
            {item.title}
          </b>
          <div className="text-[13px] text-mut font-poppins truncate mt-0.5">
            {item.author}
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-line/50">
        <div className="font-semibold font-poppins text-sm sm:text-base">
          {formatRupiah(item.price)}
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="mt-0 sm:mt-1.5 cursor-pointer rounded-full border-[1.5px] border-line px-3 py-1 text-[12px] sm:text-[13px] font-poppins hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

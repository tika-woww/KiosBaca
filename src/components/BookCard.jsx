import React from "react";
import { Link } from "react-router-dom";
import { formatRupiah } from "../context/buku";

export default function BookCard({ infoBook }) {
  return (
    <Link
      to={`/book/${infoBook.id}`}
      className="group block w-[150px] cursor-pointer transition-transform duration-200 hover:-translate-y-1"
    >
      <img
        src={infoBook.coverImage}
        alt={infoBook.title}
        className="relative w-[150px] rounded-xl object-cover"
      />

      <div className="mt-3 space-y-0.5 px-0.5 font-poppins">
        <h4 className="font-semibold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-[#E9C46A] transition-colors">
          {infoBook.title}
        </h4>
        <p className="text-slate-500 text-sm font-normal">{infoBook.author}</p>
        <p className="font-bold text-slate-900 text-base pt-0.5">
          {formatRupiah(infoBook.price)}
        </p>
      </div>
    </Link>
  );
}

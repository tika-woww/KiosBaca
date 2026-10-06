import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeranjangBookCard from "../../components/KeranjangBookCard.jsx";
import { useCart } from "../../context/CardContext.jsx";
import { formatRupiah } from "../../context/buku.js";

export default function Keranjang() {
      const { cart, removeFromCart, totalItems, subtotal, discount, total } = useCart();

      const methods = [
        { id: "qris", label: "QRIS" },
        { id: "transfer", label: "Transfer virtual account" },
        { id: "kartu", label: "Kartu kredit" },
      ];

      const [method, setMethod] = useState("qris");
      const navigate = useNavigate();
    return (
      <>
        <h2 className="text-[26px] font-bold font-bricolage">Keranjang</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-[1fr_330px]">
          <div className="rounded-2xl border border-line bg-surf px-5 py-2">
            {cart.length === 0 && (
              <p className="py-4 text-mut">
                Keranjangmu kosong.{" "}
                <Link to="/katalog" className="text-acc underline">
                  Pilih buku dari katalog
                </Link>
              </p>
            )}
            {cart.map((item) => (
              <KeranjangBookCard
                key={item.id}
                item={item}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-line bg-surf p-5">
            <h3 className="text-[17px] font-bold font-bricolage">Ringkasan</h3>
            <div className="mt-3 flex justify-between font-poppins text-sm">
              <span className="text-mut">Subtotal ({totalItems} item)</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between font-poppins text-sm">
              <span className="text-mut">Diskon</span>
              <span>−{formatRupiah(discount)}</span>
            </div>
            <div className="my-2.5 flex justify-between text-lg font-bold font-bricolage">
              <span>Total</span>
              <span>{formatRupiah(total)}</span>
            </div>

            {methods.map((m) => (
              <label
                key={m.id}
                className="mt-2 flex gap-2 rounded-[10px] border-[1.5px] border-line px-3 py-2 font-poppins text-sm"
              >
                <input
                  type="radio"
                  name="pay"
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                />
                {m.label}
              </label>
            ))}

            <button
              type="button"
              disabled={!cart.length}
              onClick={() => navigate(`/pembayaran/${method}`)}
              className="mt-4 w-full cursor-pointer rounded-full bg-lime-800 px-5 py-2.5 font-semibold text-white disabled:opacity-40 font-poppins text-sm"
            >
              Bayar {formatRupiah(total)}
            </button>
          </aside>
        </div>
      </>
    );
}
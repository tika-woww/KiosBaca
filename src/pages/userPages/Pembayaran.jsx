import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CardContext";
import { formatRupiah } from "../../context/buku";

const METHODS = {
    qris : "QRIS",
    transfer : "Transfer virtual account",
    kartu : "Kartu kredit",
};

export default function Pembayaran(){
    const {method} = useParams();
    const {cart, subtotal, discount, total, clearCart} = useCart();

    const [loading, setLoading] = useState(false);

    // untuk informasi setelah pembayaran selesai
    const [order, setOrder] = useState(null);

    const methodLabel = METHODS[method];

    // digunakan untuk nomor bank transfer
    const [vaNumber] = useState(
      () => "8808" + String(Math.floor(Math.random() * 1e12)).padStart(12, "0"),
    );

    const handlePay = (e) => {
      e.preventDefault();
      setLoading(true);

      setTimeout(() => {
        setOrder({
            // id dibuat secara acak untuk nomor pemesanan agar tidak sama
            id: "INV-" + String(Date.now()).slice(-6),
            items: cart,
            total,
            methodLabel,
        });
        clearCart();
        setLoading(false);
      }, 1200);
    };

    // tampilan saat sudah berhasil membayar
    if (order) {
      return (
        <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center font-poppins">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-lime-800 text-2xl text-white">
            ✓
          </div>
          <h2 className="mt-4 text-xl font-bold">Pembayaran berhasil</h2>
          <p className="mt-1 text-sm text-gray-500">
            Nomor pesanan {order.id} · {order.methodLabel}
          </p>

          <ul className="my-5 divide-y divide-gray-200 text-left text-sm">
            {order.items.map((b) => (
              <li key={b.id} className="flex justify-between py-2">
                <span>{b.title}</span>
                <span>{formatRupiah(b.price)}</span>
              </li>
            ))}
            <li className="flex justify-between py-2 font-bold">
              <span>Total dibayar</span>
              <span>{formatRupiah(order.total)}</span>
            </li>
          </ul>

          <Link
            to="/"
            className="block w-full rounded-full bg-lime-800 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Kembali Dashboard
          </Link>
        </div>
      );
    }

    return (
      <div className="font-poppins">
        <Link to="/cart" className="text-sm text-gray-500">
          ← Kembali ke keranjang
        </Link>
        <h2 className="mb-5 mt-2 text-2xl font-bold">Pembayaran</h2>

        <div className="grid gap-6 md:grid-cols-[1fr_330px]">
          {/* Instruksi sesuai metode */}
          <form
            onSubmit={handlePay}
            className="h-fit rounded-2xl border border-gray-200 bg-white p-5"
          >
            <h3 className="font-bold">{methodLabel}</h3>

            {method === "qris" && (
              <div className="my-5 text-center">
                {/* Ganti dengan gambar QR dari payment gateway */}
                <div className="mx-auto grid size-48 place-items-center rounded-xl border-2 border-dashed border-gray-300 text-sm text-gray-400">
                  QR code
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Pindai dengan aplikasi e-wallet atau mobile banking, lalu
                  tekan tombol di bawah setelah membayar.
                </p>
              </div>
            )}

            {method === "transfer" && (
              <div className="my-5 text-sm">
                <p className="text-gray-500">Nomor virtual account</p>
                <div className="mt-1 flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3">
                  <span className="text-lg font-bold tracking-wider">
                    {vaNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(vaNumber)}
                    className="cursor-pointer text-lime-800"
                  >
                    Salin
                  </button>
                </div>
                <p className="mt-3 text-gray-500">
                  Transfer tepat {formatRupiah(total)} lewat ATM, mobile
                  banking, atau internet banking.
                </p>
              </div>
            )}

            {method === "kartu" && (
              <div className="my-4 text-sm">
                <label className="block">
                  Nama pada kartu
                  <input
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                    placeholder="Nama lengkap"
                  />
                </label>
                <label className="mt-3 block">
                  Nomor kartu
                  <input
                    required
                    inputMode="numeric"
                    maxLength={19}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                    placeholder="0000 0000 0000 0000"
                  />
                </label>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <label>
                    Berlaku s/d
                    <input
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </label>
                  <label>
                    CVV
                    <input
                      required
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                      placeholder="•••"
                    />
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full cursor-pointer rounded-full bg-lime-800 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              {loading
                ? "Memproses..."
                : method === "kartu"
                  ? `Bayar ${formatRupiah(total)}`
                  : "Saya sudah membayar"}
            </button>
          </form>

          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 text-sm">
            <h3 className="font-bold">Ringkasan pesanan</h3>
            <ul className="my-3 divide-y divide-gray-200">
              {cart.map((b) => (
                <li key={b.id} className="flex justify-between gap-3 py-2">
                  <span>{b.title}</span>
                  <span className="whitespace-nowrap">
                    {formatRupiah(b.price)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Diskon</span>
              <span>−{formatRupiah(discount)}</span>
            </div>
            <div className="mt-2 flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </aside>
        </div>
      </div>
    );
}
# Personal Portfolio

Website portfolio personal : modern, interaktif, dark/light theme.
**Saat ini local only** : belum di-deploy. Vanilla HTML/CSS/JS, tanpa build step, tanpa dependency, semua path relatif → siap deploy ke hosting statis mana pun kapan saja.

## Menjalankan secara lokal

Pilih salah satu:

```powershell
# Opsi 1 : Python (paling simpel, biasanya sudah terinstall)
cd D:\CariKerja\Portofolio
python -m http.server 5173
# lalu buka http://localhost:5173

# Opsi 2 : Node.js
cd D:\CariKerja\Portofolio
npx serve .

# Opsi 3 : tanpa server
# Double-click index.html (butuh internet untuk load font Google)
```

## Mengganti konten

**Semua konten ada di satu file: [`js/data.js`](js/data.js).**
Konten telah diisi dari `CV/CV_ATS_Muhammad_Faishal_Putra_v2.pdf` dan sertifikat Microsoft Excel / Power BI di folder `Sertifikat`, tanpa IPK. Bahasa Inggris mengikuti CV dan template. Edit data, simpan, lalu refresh browser. Judul dan metadata sosial juga ada di `index.html`.

| Bagian          | Yang diedit di `data.js`                                   |
| --------------- | ---------------------------------------------------------- |
| Hero            | `name`, `firstName`, `roles`, `tagline`, `status`, `heroChips` |
| About           | `about.paragraphs`, `about.facts`, `about.highlights` (spesialisasi Sistem Informasi Cerdas dan HMIF ITB) |
| Skills          | `skills[]` : title, blurb, tags, icon (`ai/data/code/web/tools/spark`) |
| Projects        | `projects[]` : 9 studi kasus dengan cover dari slide PDF atau ilustrasi SVG, kategori dipakai otomatis untuk filter |
| Featured        | `featured` : desc, tech, flow, highlights, purpose/approach/deliverable    |
| Experience      | `experience[]` : jabatan, perusahaan, periode, tanggung jawab, dan tools |
| Journey (hidden) | `timeline[]` : type: `work` / `education` / `milestone`    |
| Certifications | `certifications[]` : judul, penerbit, tahun, kode kursus, URL verifikasi opsional; Microsoft Excel dan Power BI ditampilkan pertama |
| Exploring       | `exploring[]` : chip marquee                               |
| Contact/Socials | `email`, `socials[]` : LinkedIn, email, dan telepon sesuai CV |

Warna & font: edit CSS variables di bagian atas [`css/styles.css`](css/styles.css) (`:root` untuk dark, `html[data-theme="light"]` untuk light).

## Struktur

```
Portofolio/
├── index.html        # struktur halaman
├── css/styles.css    # seluruh styling + theme
├── js/data.js        # ★ SEMUA KONTEN : edit di sini
├── js/main.js        # rendering + interaksi
├── assets/           # foto profil dan cover slide proyek
└── README.md
```

## Deploy (nanti, kalau sudah siap)

Situs ini statis murni : **tidak perlu build, tidak perlu config**. Folder ini langsung jadi publish directory.

**Checklist sebelum deploy:**
1. Tinjau kembali data kontak dan konten CV di `js/data.js`
2. Tambahkan URL GitHub/demo proyek bila tersedia; tombol otomatis disembunyikan selama URL kosong
3. Perbarui metadata di `index.html` jika fokus profesional berubah

**Pilihan hosting gratis (semuanya cukup upload folder ini):**

| Platform | Cara |
| --- | --- |
| **GitHub Pages** | Push folder ini ke repo → Settings → Pages → deploy from branch `main`, folder `/ (root)`. Aman di subpath (`username.github.io/repo`) karena semua path relatif |
| **Netlify** | Drag & drop folder ini ke [app.netlify.com/drop](https://app.netlify.com/drop) : selesai |
| **Vercel** | `npx vercel` di folder ini, atau import repo di dashboard (framework preset: *Other*, no build command, output: root) |
| **Cloudflare Pages** | Import repo → build command kosong → output directory `/` |

Catatan: parameter `?snapshot` hanyalah alat QA/screenshot : tidak mengganggu produksi.

## Fitur

- Dark/light theme (toggle di navbar, tersimpan di localStorage)
- Custom cursor ring, magnetic buttons, 3D tilt cards
- Scroll reveal, scroll progress bar, active-section nav indicator
- Filter proyek, carousel horizontal (geser sentuh dan tombol panah), serta modal detail
- Featured project dengan accordion (Purpose / Approach / Deliverable)
- Timeline interaktif, sertifikasi, dan marquee area minat
- Copy email ke clipboard, toast notification
- Responsive (desktop / tablet / mobile), `prefers-reduced-motion` support

Journey sementara disembunyikan dengan atribut `hidden` di `index.html`; datanya tetap tersimpan. Sertifikasi ditampilkan sebagai bagian terpisah.

Foto profil ada di `assets/faishal.jpg`, disalin dari `CV Bahan/Foto.JPG`. Pemotongan tampilan diatur lewat CSS tanpa mengubah foto sumber.

Proyek diperbarui dari materi di folder `CV Bahan`: analisis data pariwisata Jawa Barat, studi kebutuhan HR laundry, transformasi digital Songket, enterprise architecture studio kreatif, analisis strategi dan proses, arsitektur TI agritech, analisis organisasi edtech, pencocokan kelompok mahasiswa, serta dashboard persediaan. Rekomendasi yang berasal dari dokumen akademik ditulis sebagai usulan, bukan klaim implementasi.

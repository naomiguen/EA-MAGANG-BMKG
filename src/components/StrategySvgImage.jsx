import React from "react";


const StrategySvgImage = ({ onKlikDiagram }) => {
  
  // Debugging: Pastikan paket sampai
  console.log(" Komponen Gambar Render. Props onKlikDiagram:", onKlikDiagram);
    return (
    <svg
      //  TAMBAH KLIK & CURSOR
      onClick={onKlikDiagram}
      className="w-full h-auto cursor-pointer"

     
      xmlns="http://www.w3.org/2000/svg"
      style={{
        background: "transparent",
        backgroundColor: "transparent",
        colorScheme: "light",
        minHeight: "800px" 
      }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="826px"
      height="1071px"
      viewBox="0 0 826 1200" 
    >
      
      <defs>
        <clipPath id="a">
          <path d="M21 222H803V248H21z" />
        </clipPath>
        <clipPath id="b">
          <path d="M21 126H271V213H21z" />
        </clipPath>
        <clipPath id="c">
          <path d="M285 126H535V213H285z" />
        </clipPath>
        <clipPath id="d">
          <path d="M553 126H803V213H553z" />
        </clipPath>
      </defs>
      <rect
        fill="light-dark(#fff,var(--ge-dark-color, #121212))"
        width="100%"
        height="100%"
      />
      <g data-cell-id={0}>
        <g data-cell-id={1}>
          <path
            fill="light-dark(#fff,var(--ge-dark-color, #121212))"
            stroke="light-dark(#000 ,#fff)"
            pointerEvents="all"
            transform="translate(.5 .5)"
            data-cell-id="card"
            d="M-0.37 0H824.37V1070H-0.37z"
          />
          <path
            d="M18.51 60.44l393.15-42.39 393.16 42.39z"
            fill="light-dark(#b1ddf0 ,#173d4d)"
            stroke="light-dark(#10739e ,#54a9ce)"
            strokeMiterlimit={10}
            pointerEvents="all"
            transform="translate(.5 .5)"
            data-cell-id="Segitiga atas"
          />
          <g data-cell-id="visi">
            <path
              fill="light-dark(#4ba6cd ,#173d4d)"
              stroke="light-dark(#10739e ,#54a9ce)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M21 61.57H803V117.37H21z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={412} y={80.46}>
                {"<<VISION>>"}
              </text>
              <text x={412} y={94.46}>
                {
                  "Terwujudnya Stasiun Meteorologi Kelas I Sultan Aji Muhammad Sulaiman Sepinggan Balikpapan Sebagai Sentra Pelayanan Informasi"
                }
              </text>
              <text x={412} y={108.46}>
                {
                  "Meteorologi Penerbangan yang Handal dan Terpercaya guna mendukung Keselamatan Penerbangan."
                }
              </text>
            </g>
          </g>
          <g data-cell-id="MAS">
            <g transform="translate(.5 .5)" pointerEvents="none">
              <path
                fill="light-dark(#479cc1 ,#3881a1)"
                d="M21 221.98H803V248.14H21z"
              />
              <path
                d="M21 221.98h782v26.16H21v-26.16"
                fill="none"
                stroke="light-dark(#000 ,#fff)"
                strokeLinecap="square"
                strokeMiterlimit={10}
              />
            </g>
            <g data-cell-id="kdk1sCQruOZLYn1sfR_3-26">
              <g data-cell-id="kdk1sCQruOZLYn1sfR_3-27">
                <g transform="translate(.5 .5)" fill="none" pointerEvents="all">
                  <path d="M21 221.98H803V247.98H21z" />
                  <path
                    d="M21 247.98"
                    stroke="light-dark(#000 ,#fff)"
                    strokeLinecap="square"
                    strokeMiterlimit={10}
                  />
                </g>
                <g
                  fill="light-dark(#000 ,#fff)"
                  fontFamily="Helvetica"
                  textAnchor="middle"
                  fontSize="11.999999999999998px"
                  clipPath="url(#a)"
                >
                  <text x={412} y={239.98}>
                    {"Maximizing Aviation Safety"}
                  </text>
                </g>
              </g>
            </g>
          </g>
          <g data-cell-id="Public Value">
            <g transform="translate(.5 .5)" pointerEvents="none">
              <path
                fill="light-dark(#fff,var(--ge-dark-color, #121212))"
                d="M21 256.86H803V335.33000000000004H21z"
              />
              <path
                d="M21 256.86h782v78.46H21v-78.46"
                fill="none"
                stroke="light-dark(#000 ,#fff)"
                strokeLinecap="square"
                strokeMiterlimit={10}
              />
              <path
                d="M59 256.86v78"
                fill="none"
                stroke="light-dark(#000 ,#fff)"
                strokeMiterlimit={10}
              />
            </g>
            <g data-cell-id="kdk1sCQruOZLYn1sfR_3-29">
              <g
                transform="translate(.5 .5)"
                fill="none"
                pointerEvents="all"
                data-cell-id="kdk1sCQruOZLYn1sfR_3-30"
              >
                <path d="M21 256.86H59V334.86H21z" />
                <path
                  d="M21 334.86"
                  stroke="light-dark(#000 ,#fff)"
                  strokeLinecap="square"
                  strokeMiterlimit={10}
                />
              </g>
              <g
                transform="translate(.5 .5)"
                fill="none"
                pointerEvents="all"
                data-cell-id="kdk1sCQruOZLYn1sfR_3-31"
              >
                <path d="M59 256.86H803V334.86H59z" />
                <path
                  d="M59 334.86"
                  stroke="light-dark(#000 ,#fff)"
                  strokeLinecap="square"
                  strokeMiterlimit={10}
                />
              </g>
            </g>
          </g>
          <g data-cell-id="kdk1sCQruOZLYn1sfR_3-32">
            <path
              fill="none"
              transform="translate(.5 .5) rotate(-90 39.84 296.96)"
              pointerEvents="all"
              d="M6.86 283.88H72.81V310.04H6.86z"
            />
            <text
              x={39.84}
              y={301.96}
              transform="rotate(-90 39.84 296.96)"
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              {"Public Value"}
            </text>
          </g>
          <g data-cell-id="pv1">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M126.06 269.94H252.87V322.25H126.06z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={189.47} y={287.1}>
                {"<<PV1>>"}
              </text>
              <text x={189.47} y={301.1}>
                {"Efisiensi Operasional"}
              </text>
              <text x={189.47} y={315.1}>
                {"Penerbangan"}
              </text>
            </g>
          </g>
          <g data-cell-id="pv3">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M371.96 269.94H485.02V322.25H371.96z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={428.49} y={287.09}>
                {"<<PV3>>"}
              </text>
              <text x={428.49} y={301.09}>
                {"Keselamatan"}
              </text>
              <text x={428.49} y={315.09}>
                {"Penerbangan"}
              </text>
            </g>
          </g>
          <g data-cell-id="pv2">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M614.57 269.94H727.6300000000001V322.25H614.57z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={671.1} y={294.09}>
                {"<<PV2>>"}
              </text>
              <text x={671.1} y={308.09}>
                {"Kepercayaan Publik"}
              </text>
            </g>
          </g>
          <g
            transform="translate(.5 .5)"
            pointerEvents="none"
            data-cell-id="IPdanCC"
          >
            <path
              fill="light-dark(#fff,var(--ge-dark-color, #121212))"
              d="M21 387.63H803V867.14H21z"
            />
            <path
              d="M21 387.63h782v479.51H21V387.63"
              fill="none"
              stroke="light-dark(#000 ,#fff)"
              strokeLinecap="square"
              strokeMiterlimit={10}
            />
          </g>
          <g data-cell-id="IPdanC">
            <path
              fill="none"
              transform="translate(.5 .5) rotate(-90 39.84 458.25)"
              pointerEvents="all"
              d="M-26.11 445.17H105.79V471.33000000000004H-26.11z"
            />
            <text
              x={39.84}
              y={463.25}
              transform="rotate(-90 39.84 458.25)"
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              {"Customer / Stakeholder"}
            </text>
          </g>
          <g data-cell-id="kdk1sCQruOZLYn1sfR_3-56">
            <path
              fill="none"
              transform="translate(.5 .5) rotate(-90 39.84 617.23)"
              pointerEvents="all"
              d="M-21.4 604.16H101.08000000000001V630.3199999999999H-21.4z"
            />
            <text
              x={39.84}
              y={622.23}
              transform="rotate(-90 39.84 617.23)"
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              {"Internal Process"}
            </text>
          </g>
          <g data-cell-id="IP1">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M119.93 570.72H261.26V631.75H119.93z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={190.59} y={592.23}>
                {"<<IP1>>"}
              </text>
              <text x={190.59} y={606.23}>
                {"Standardized Observation"}
              </text>
              <text x={190.59} y={620.23}>
                {"& Analysis Process"}
              </text>
            </g>
          </g>
          <g data-cell-id="C1">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M119.93 427.74H261.26V488.77H119.93z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={190.59} y={449.25}>
                {"<<C1>>"}
              </text>
              <text x={190.59} y={463.25}>
                {"High Satisfaction of"}
              </text>
              <text x={190.59} y={477.25}>
                {"Aviation Partners"}
              </text>
            </g>
          </g>
          <g data-cell-id="C2">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M359.48 427.74H500.81000000000006V488.77H359.48z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={430.14} y={449.25}>
                {"<<C2>>"}
              </text>
              <text x={430.14} y={463.25}>
                {"Compliance with"}
              </text>
              <text x={430.14} y={477.25}>
                {"Int&apos;l Standards"}
              </text>
            </g>
          </g>
          <g data-cell-id="C3">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M595.72 426.87H737.0500000000001V487.9H595.72z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={666.39} y={448.38}>
                {"<<C3>>"}
              </text>
              <text x={666.39} y={462.38}>
                {"Strong Collaborative"}
              </text>
              <text x={666.39} y={476.38}>
                {"Engagement"}
              </text>
            </g>
          </g>
          <g data-cell-id="IP2">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M349.71 570.72H510.58V631.75H349.71z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={430.14} y={592.23}>
                {"<<IP2>>"}
              </text>
              <text x={430.14} y={606.23}>
                {"Effective Information"}
              </text>
              <text x={430.14} y={620.23}>
                {"Dissemination & Coordination"}
              </text>
            </g>
          </g>
          <g data-cell-id="IP3">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M595.72 570.72H737.0500000000001V631.75H595.72z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={666.39} y={592.23}>
                {"<<IP3>>"}
              </text>
              <text x={666.39} y={606.23}>
                {"Integrated Data"}
              </text>
              <text x={666.39} y={620.23}>
                {"Management System"}
              </text>
            </g>
          </g>
          <g data-cell-id="LG">
            <g transform="translate(.5 .5)" pointerEvents="none">
              <path
                fill="light-dark(#fff,var(--ge-dark-color, #121212))"
                d="M21 922.94H803V1045H21z"
              />
              <path
                d="M21 922.94h782V1045H21V922.94"
                fill="none"
                stroke="light-dark(#000 ,#fff)"
                strokeLinecap="square"
                strokeMiterlimit={10}
              />
              <path
                d="M68 922.94v122"
                fill="none"
                stroke="light-dark(#000 ,#fff)"
                strokeMiterlimit={10}
              />
            </g>
            <g data-cell-id="18trQx8ktChYFQUgksBL-13">
              <g
                transform="translate(.5 .5)"
                fill="none"
                pointerEvents="all"
                data-cell-id="18trQx8ktChYFQUgksBL-14"
              >
                <path d="M21 922.94H68V1044.94H21z" />
                <path
                  d="M21 1044.94"
                  stroke="light-dark(#000 ,#fff)"
                  strokeLinecap="square"
                  strokeMiterlimit={10}
                />
              </g>
              <g
                transform="translate(.5 .5)"
                fill="none"
                pointerEvents="all"
                data-cell-id="18trQx8ktChYFQUgksBL-15"
              >
                <path d="M68 922.94H803V1044.94H68z" />
                <path
                  d="M68 1044.94"
                  stroke="light-dark(#000 ,#fff)"
                  strokeLinecap="square"
                  strokeMiterlimit={10}
                />
              </g>
            </g>
          </g>
          <g data-cell-id="wnEzJVQnu9i65wA92bw6-1">
            <path
              fill="none"
              transform="translate(.5 .5) rotate(-90 44.55 985.71)"
              pointerEvents="all"
              d="M-11.98 972.64H101.08V998.8H-11.98z"
            />
            <text
              x={44.55}
              y={990.71}
              transform="rotate(-90 44.55 985.71)"
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              {"Learning & Growth"}
            </text>
          </g>
          <g data-cell-id="L1">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M86.95 953.46H237.7V1017.98H86.95z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={162.32} y={976.71}>
                {"<<L1>>"}
              </text>
              <text x={162.32} y={990.71}>
                {"Digital & Technological"}
              </text>
              <text x={162.32} y={1004.71}>
                {"Capability"}
              </text>
            </g>
          </g>
          <g data-cell-id="L2">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M261.25 953.46H412V1017.98H261.25z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={336.62} y={976.71}>
                {"<<L2>>"}
              </text>
              <text x={336.62} y={990.71}>
                {"Certified Professional"}
              </text>
              <text x={336.62} y={1004.71}>
                {"Competency"}
              </text>
            </g>
          </g>
          <g data-cell-id="L3">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M444.97 951.71H595.72V1016.23H444.97z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={520.35} y={981.97}>
                {"<<L3>>"}
              </text>
              <text x={520.35} y={995.97}>
                {"Safety & Service Culture"}
              </text>
            </g>
          </g>
          <g data-cell-id="L4">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M623.99 951.71H774.74V1016.23H623.99z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={699.36} y={974.97}>
                {"<<L4>>"}
              </text>
              <text x={699.36} y={988.97}>
                {"Adaptive Human"}
              </text>
              <text x={699.36} y={1002.97}>
                {"Capital Management"}
              </text>
            </g>
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="wnEzJVQnu9i65wA92bw6-6"
          >
            <path
              d="M336.62 953.46l-.59-218.66"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M336.02 729.55l3.51 6.99-3.5-1.74-3.5 1.76z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="wnEzJVQnu9i65wA92bw6-12"
          >
            <path
              d="M72.82 705.85h-4.71v-91.54l43.7 1.84"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M118.81 616.44l-7.14 3.21.29-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="wnEzJVQnu9i65wA92bw6-13"
          >
            <path
              d="M520.35 951.71v-93.88"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M520.35 850.83l3.5 7h-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="wnEzJVQnu9i65wA92bw6-14"
          >
            <path
              d="M699.36 951.71V797.67"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M699.36 790.67l3.5 7h-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="wnEzJVQnu9i65wA92bw6-16"
          >
            <path
              d="M162.32 953.46V666.62h602.99v-49.69l-20.15-.31"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M738.17 616.51l7.05-3.39-.11 7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g data-cell-id="IP4">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M72.82 684.06H784.1600000000001V727.65H72.82z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={428.49} y={703.85}>
                {"<<IP4>>"}
              </text>
              <text x={428.49} y={717.85}>
                {"Implementasi Sistem Manajemen Mutu"}
              </text>
            </g>
          </g>
          <g data-cell-id="IP5">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M73.76 745.09H785.1V788.6800000000001H73.76z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={429.43} y={764.88}>
                {"<<IP5>>"}
              </text>
              <text x={429.43} y={778.88}>
                {"Reformasi Birokrasi & Tata Kelola Pemerintahan"}
              </text>
            </g>
          </g>
          <g data-cell-id="IP6">
            <path
              fill="light-dark(#8acae5 ,#1c536a)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M72.82 806.12H784.1600000000001V849.71H72.82z"
            />
            <g
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <text x={428.49} y={825.91}>
                {"<<IP6>>"}
              </text>
              <text x={428.49} y={839.91}>
                {"Sistem Manajemen Keselamatan & Kepatuhan K3"}
              </text>
            </g>
          </g>
          <g data-cell-id="HCTR">
            <path
              fill="light-dark(#479cc1 ,#3881a1)"
              stroke="light-dark(#000 ,#fff)"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M21 875.86H803V910.73H21z"
            />
            <text
              x={412}
              y={898.3}
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              {"HUMAN CAPITAL & TECHNOLOGY READINESS"}
            </text>
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="wnEzJVQnu9i65wA92bw6-17"
          >
            <path
              d="M428.49 684.06l.4-45.07"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M428.95 631.99l3.44 7.04-7-.07z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="wnEzJVQnu9i65wA92bw6-18"
          >
            <path
              d="M72.82 827.91H62.45V601.23h49.36"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M118.81 601.23l-7 3.5v-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-4"
          >
            <path
              d="M416.95 570.66l-.24-26.1H190.59v-47.68"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M190.59 489.88l3.5 7h-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-6"
          >
            <path
              d="M446.23 570.66l-.31-34.81h220.47v-39.84"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M666.39 489.01l3.5 7h-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-7"
          >
            <path
              d="M190.59 570.72v-17.44h141.32v-95.03h19.45"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M358.36 458.25l-7 3.5v-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-8"
          >
            <path
              d="M118.79 589.76l-31.84.14V457.38l24.86.66"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M118.81 458.22l-7.09 3.32.18-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-9"
          >
            <path
              d="M737.05 588.16h28.26v-69.75H303.65v-60.16h-34.28"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M262.37 458.25l7-3.5v7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-10"
          >
            <path
              d="M737.05 601.23h47.11v-91.54H558.04v-35.74l-49.11-.38"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M501.93 473.52l7.02-3.45-.05 7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-11"
          >
            <path
              d="M119.64 475.1l-13.85-.28v107.23l6.02.04"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M118.81 582.13l-7.02 3.46.04-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-12"
          >
            <path
              d="M261.25 473.51l32.98.44v112.46l47.36-.37"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M348.59 585.99l-6.97 3.55-.05-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-13"
          >
            <path
              d="M430.14 488.77v73.83"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M430.14 569.6l-3.5-7h7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-14"
          >
            <path
              d="M594.73 466.23l-46.12-.13v120.31l-29.91-.34"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M511.7 585.99l7.04-3.42-.08 7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-15"
          >
            <path
              d="M189.47 269.94l-.3-13.82"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M189.02 249.12l3.65 6.92-7 .15z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-16"
          >
            <path
              d="M671.61 269.86l.01-13.94"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M671.62 248.92l3.5 7h-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-17"
          >
            <path
              d="M595.72 601.23v13.08h-47.11v34.88H190.59v-9.32"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M190.59 632.87l3.5 7h-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-18"
          >
            <path
              d="M595.72 601.23H518.7"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M511.7 601.23l7-3.5v7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-19"
          >
            <path
              d="M359.48 443h-90.11"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M262.37 443l7-3.5v7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-20"
          >
            <path
              d="M485.02 296.09h121.43"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M613.45 296.09l-7 3.5v-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-21"
          >
            <path
              d="M252.87 296.1l110.97-.01"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M370.84 296.09l-7 3.5v-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-23"
          >
            <path
              d="M190.59 427.74v-22.67h210.1l-.42-74.71"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M400.23 323.36l3.54 6.98-7 .04z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-24"
          >
            <path
              d="M430.14 427.74l-1.53-97.38"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M428.5 323.36l3.61 6.95-7 .11z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-27"
          >
            <path
              d="M500.81 458.25h47.8V309.17h57.84"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M613.45 309.17l-7 3.5v-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-28"
          >
            <path
              d="M737.05 457.38h28.26V309.17h-29.57"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M728.74 309.17l7-3.5v7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            transform="translate(.5 .5)"
            pointerEvents="none"
            data-cell-id="DM"
          >
            <path
              fill="light-dark(#479cc1 ,#3881a1)"
              d="M553.32 344.04H803V378.91H553.32z"
            />
            <path
              d="M553.32 344.04H803v34.88H553.32v-34.88"
              fill="none"
              stroke="light-dark(#000 ,#fff)"
              strokeLinecap="square"
              strokeMiterlimit={10}
            />
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-29"
          >
            <path
              d="M595.72 442.12l-65.95.44V309.17h-36.64"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M486.13 309.17l7-3.5v7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            transform="translate(.5 .5)"
            pointerEvents="none"
            data-cell-id="SC"
          >
            <path
              fill="light-dark(#479cc1 ,#3881a1)"
              d="M286.58 344.04H536.26V378.91H286.58z"
            />
            <path
              d="M286.58 344.04h249.67v34.88H286.58v-34.88"
              fill="none"
              stroke="light-dark(#000 ,#fff)"
              strokeLinecap="square"
              strokeMiterlimit={10}
            />
          </g>
          <g data-cell-id="Misi1">
            <g transform="translate(.5 .5)" pointerEvents="none">
              <path
                fill="light-dark(#8acae5 ,#173d4d)"
                d="M21 126.08H270.68V213.26H21z"
              />
              <path
                d="M21 126.08h249.67v87.19H21v-87.19"
                fill="none"
                stroke="light-dark(#10739e ,#54a9ce)"
                strokeLinecap="square"
                strokeMiterlimit={10}
              />
            </g>
            <g data-cell-id="tECFEMoWoNaPAm7a_ITt-33">
              <g data-cell-id="tECFEMoWoNaPAm7a_ITt-34">
                <g transform="translate(.5 .5)" fill="none" pointerEvents="all">
                  <path d="M21 126.08H271V213.07999999999998H21z" />
                  <path
                    d="M21 213.07999999999998"
                    stroke="light-dark(#10739e ,#54a9ce)"
                    strokeLinecap="square"
                    strokeMiterlimit={10}
                  />
                </g>
                <g
                  fill="light-dark(#000 ,#fff)"
                  fontFamily="Helvetica"
                  textAnchor="middle"
                  fontSize="11.999999999999998px"
                  clipPath="url(#b)"
                >
                  <text x={146} y={146.58}>
                    {"<<MISSION>>"}
                  </text>
                  <text x={146} y={160.58}>
                    {"Mewujudkan peningkatan kualitas dan"}
                  </text>
                  <text x={146} y={174.58}>
                    {"kuantitas pengamatan, pengumpulan,"}
                  </text>
                  <text x={146} y={188.58}>
                    {"penyebaran data dan informasi meteorologi"}
                  </text>
                  <text x={146} y={202.58}>
                    {"penerbangan sesuai standar Internasional."}
                  </text>
                </g>
              </g>
            </g>
          </g>
          <g
            stroke="light-dark(#9a9a9a ,#696969)"
            strokeMiterlimit={10}
            data-cell-id="tECFEMoWoNaPAm7a_ITt-22"
          >
            <path
              d="M119.93 444.3l-23.56.44V297.4l20.51-.29"
              fill="none"
              pointerEvents="stroke"
              transform="translate(.5 .5)"
            />
            <path
              d="M123.88 297.02l-6.95 3.59-.1-7z"
              fill="light-dark(#9a9a9a ,#696969)"
              pointerEvents="all"
              transform="translate(.5 .5)"
            />
          </g>
          <g
            transform="translate(.5 .5)"
            pointerEvents="none"
            data-cell-id="SE"
          >
            <path
              fill="light-dark(#479cc1 ,#3881a1)"
              d="M21 344.04H270.68V378.91H21z"
            />
            <path
              d="M21 344.04h249.67v34.88H21v-34.88"
              fill="none"
              stroke="light-dark(#000 ,#fff)"
              strokeLinecap="square"
              strokeMiterlimit={10}
            />
          </g>
          <g data-cell-id="05RmtZPogVj4Z4eBfIh9-6">
            <path
              fill="none"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M70.46 348.4H221.20999999999998V374.56H70.46z"
            />
            <text
              x={145.83}
              y={366.48}
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              {"SERVICE EXCELLENCE"}
            </text>
          </g>
          <g data-cell-id="HcmtDr_CGQenQgmzdA9t-2">
            <path
              fill="none"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M312.08 348.89H509.78V375.05H312.08z"
            />
            <text
              x={410.93}
              y={366.97}
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              {"STRATEGIC COLLLABORATION"}
            </text>
          </g>
          <g data-cell-id="HcmtDr_CGQenQgmzdA9t-3">
            <path
              fill="none"
              pointerEvents="all"
              transform="translate(.5 .5)"
              d="M591.01 348.89H765.31V375.05H591.01z"
            />
            <text
              x={678.16}
              y={366.97}
              fill="light-dark(#000 ,#fff)"
              fontFamily="Helvetica"
              textAnchor="middle"
              fontSize="11.999999999999998px"
            >
              <tspan>{"DIGITAL MODERNIZATION"}</tspan>
            </text>
          </g>
          <g data-cell-id="Misi2">
            <g transform="translate(.5 .5)" pointerEvents="none">
              <path
                fill="light-dark(#8acae5 ,#173d4d)"
                d="M285 126.08H534.6800000000001V213.26H285z"
              />
              <path
                d="M285 126.08h249.67v87.19H285v-87.19"
                fill="none"
                stroke="light-dark(#10739e ,#54a9ce)"
                strokeLinecap="square"
                strokeMiterlimit={10}
              />
            </g>
            <g data-cell-id="qaVLlRl51US2y16quF3I-4">
              <g data-cell-id="qaVLlRl51US2y16quF3I-5">
                <g transform="translate(.5 .5)" fill="none" pointerEvents="all">
                  <path d="M285 126.08H535V213.07999999999998H285z" />
                  <path
                    d="M285 213.07999999999998"
                    stroke="light-dark(#10739e ,#54a9ce)"
                    strokeLinecap="square"
                    strokeMiterlimit={10}
                  />
                </g>
                <g
                  fill="light-dark(#000 ,#fff)"
                  fontFamily="Helvetica"
                  textAnchor="middle"
                  fontSize="11.999999999999998px"
                  clipPath="url(#c)"
                >
                  <text x={410} y={146.58}>
                    {"<<MISSION>>"}
                  </text>
                  <text x={410} y={160.58}>
                    {"Mewujudkan peningkatan kualitas dan"}
                  </text>
                  <text x={410} y={174.58}>
                    {"kuantitas analisis pelayanan informasi"}
                  </text>
                  <text x={410} y={188.58}>
                    {"meteorologi penerbangan sesuai standar"}
                  </text>
                  <text x={410} y={202.58}>
                    {"Internasional."}
                  </text>
                </g>
              </g>
            </g>
          </g>
          <g data-cell-id="Misi3">
            <g transform="translate(.5 .5)" pointerEvents="none">
              <path
                fill="light-dark(#8acae5 ,#173d4d)"
                d="M553.33 126.08H803.01V213.26H553.33z"
              />
              <path
                d="M553.33 126.08H803v87.19H553.33v-87.19"
                fill="none"
                stroke="light-dark(#10739e ,#54a9ce)"
                strokeLinecap="square"
                strokeMiterlimit={10}
              />
            </g>
            <g data-cell-id="qaVLlRl51US2y16quF3I-7">
              <g data-cell-id="qaVLlRl51US2y16quF3I-8">
                <g transform="translate(.5 .5)" fill="none" pointerEvents="all">
                  <path d="M553.33 126.08H803.33V213.07999999999998H553.33z" />
                  <path
                    d="M553.33 213.07999999999998"
                    stroke="light-dark(#10739e ,#54a9ce)"
                    strokeLinecap="square"
                    strokeMiterlimit={10}
                  />
                </g>
                <g
                  fill="light-dark(#000 ,#fff)"
                  fontFamily="Helvetica"
                  textAnchor="middle"
                  fontSize="11.999999999999998px"
                  clipPath="url(#d)"
                >
                  <text x={678.33} y={146.58}>
                    {"<<MISSION>>"}
                  </text>
                  <text x={678.33} y={160.58}>
                    {"Mewujudkan koordinasi dengan BBMKG"}
                  </text>
                  <text x={678.33} y={174.58}>
                    {"Wilayah III, Pemerintah Daerah / Provinsi dan"}
                  </text>
                  <text x={678.33} y={188.58}>
                    {"pengguna Layanan dalam penyelenggaraan"}
                  </text>
                  <text x={678.33} y={202.58}>
                    {"kegiatan meteorologi penerbangan."}
                  </text>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}



export default StrategySvgImage;



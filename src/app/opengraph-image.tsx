import { ImageResponse } from "next/og";

export const alt = "JOKKI ジョッキ — Solo necesitaba ir a Japón";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#221f1e",
          color: "#f5f1e8",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Círculo bermellón */}
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 780,
            height: 780,
            borderRadius: "50%",
            background: "#BC002D",
            boxShadow: "0 0 200px 40px rgba(188,0,45,0.4)",
            display: "flex",
          }}
        />

        {/* Marcas de esquina */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
            fontSize: 22,
            color: "rgba(245,241,232,0.55)",
            letterSpacing: "0.25em",
          }}
        >
          <span>N 35.6762°</span>
          <span>E 139.6503°</span>
          <span style={{ color: "#BC002D", marginTop: 6 }}>▲ TOKYO</span>
        </div>

        <div
          style={{
            position: "absolute",
            top: 40,
            right: 60,
            display: "flex",
            fontFamily: "monospace",
            fontSize: 22,
            color: "rgba(245,241,232,0.7)",
            letterSpacing: "0.25em",
          }}
        >
          MMXXVI · ● LIVE
        </div>

        {/* Contenido principal */}
        <div
          style={{
            position: "absolute",
            left: 70,
            bottom: 70,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "monospace",
              fontSize: 20,
              letterSpacing: "0.4em",
              color: "#BC002D",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 44,
                height: 2,
                background: "#BC002D",
                marginRight: 16,
                display: "flex",
              }}
            />
            <span>OFFICIAL PORTFOLIO</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 28,
            }}
          >
            <span
              style={{
                fontSize: 210,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "#f5f1e8",
              }}
            >
              JOKKI
            </span>
            <span
              style={{
                fontSize: 82,
                fontWeight: 700,
                color: "rgba(245,241,232,0.75)",
                letterSpacing: "0.05em",
              }}
            >
              ジョッキ
            </span>
          </div>

          <div
            style={{
              fontSize: 42,
              color: "#f5f1e8",
              letterSpacing: "0.02em",
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            Solo necesitaba ir a Japón
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "monospace",
              fontSize: 20,
              letterSpacing: "0.35em",
              color: "rgba(245,241,232,0.55)",
              marginTop: 22,
            }}
          >
            ALT-ROCK · ELECTRÓNICA · HIP-HOP
            <span style={{ color: "#BC002D", marginLeft: 14 }}>_</span>
          </div>
        </div>

        {/* Kanji 落 grande de marca de agua */}
        <div
          style={{
            position: "absolute",
            right: 110,
            top: 140,
            fontSize: 380,
            fontWeight: 900,
            color: "rgba(245,241,232,0.95)",
            lineHeight: 1,
            display: "flex",
          }}
        >
          落
        </div>
      </div>
    ),
    { ...size },
  );
}

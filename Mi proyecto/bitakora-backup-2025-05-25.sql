dbname=postgresql://bitakora_db_user:RNP3ewCY0ydWt2SDxUd5mLD4l9RaQH5f@dpg-d0nror8dl3ps73dq1a2g-a.oregon-postgres.render.com/bitakora_db
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Debian 16.9-1.pgdg120+1)
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: bitakora_db_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO bitakora_db_user;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: bitakora_db_user
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Rol; Type: TYPE; Schema: public; Owner: bitakora_db_user
--

CREATE TYPE public."Rol" AS ENUM (
    'ADMIN',
    'TECNICO',
    'CLIENTE'
);


ALTER TYPE public."Rol" OWNER TO bitakora_db_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Cliente; Type: TABLE; Schema: public; Owner: bitakora_db_user
--

CREATE TABLE public."Cliente" (
    id integer NOT NULL,
    nombre text NOT NULL,
    nit text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Cliente" OWNER TO bitakora_db_user;

--
-- Name: Cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: bitakora_db_user
--

CREATE SEQUENCE public."Cliente_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cliente_id_seq" OWNER TO bitakora_db_user;

--
-- Name: Cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bitakora_db_user
--

ALTER SEQUENCE public."Cliente_id_seq" OWNED BY public."Cliente".id;


--
-- Name: Equipo; Type: TABLE; Schema: public; Owner: bitakora_db_user
--

CREATE TABLE public."Equipo" (
    id integer NOT NULL,
    nombre text NOT NULL,
    tipo text NOT NULL,
    serial text NOT NULL,
    ubicacion text NOT NULL,
    "clienteId" integer NOT NULL
);


ALTER TABLE public."Equipo" OWNER TO bitakora_db_user;

--
-- Name: Equipo_id_seq; Type: SEQUENCE; Schema: public; Owner: bitakora_db_user
--

CREATE SEQUENCE public."Equipo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Equipo_id_seq" OWNER TO bitakora_db_user;

--
-- Name: Equipo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bitakora_db_user
--

ALTER SEQUENCE public."Equipo_id_seq" OWNED BY public."Equipo".id;


--
-- Name: Mantenimiento; Type: TABLE; Schema: public; Owner: bitakora_db_user
--

CREATE TABLE public."Mantenimiento" (
    id integer NOT NULL,
    fecha timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    descripcion text NOT NULL,
    "equipoId" integer NOT NULL,
    "usuarioId" integer
);


ALTER TABLE public."Mantenimiento" OWNER TO bitakora_db_user;

--
-- Name: Mantenimiento_id_seq; Type: SEQUENCE; Schema: public; Owner: bitakora_db_user
--

CREATE SEQUENCE public."Mantenimiento_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Mantenimiento_id_seq" OWNER TO bitakora_db_user;

--
-- Name: Mantenimiento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bitakora_db_user
--

ALTER SEQUENCE public."Mantenimiento_id_seq" OWNED BY public."Mantenimiento".id;


--
-- Name: Usuario; Type: TABLE; Schema: public; Owner: bitakora_db_user
--

CREATE TABLE public."Usuario" (
    id integer NOT NULL,
    nombre text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    rol text NOT NULL
);


ALTER TABLE public."Usuario" OWNER TO bitakora_db_user;

--
-- Name: Usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: bitakora_db_user
--

CREATE SEQUENCE public."Usuario_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Usuario_id_seq" OWNER TO bitakora_db_user;

--
-- Name: Usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bitakora_db_user
--

ALTER SEQUENCE public."Usuario_id_seq" OWNED BY public."Usuario".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: bitakora_db_user
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO bitakora_db_user;

--
-- Name: Cliente id; Type: DEFAULT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Cliente" ALTER COLUMN id SET DEFAULT nextval('public."Cliente_id_seq"'::regclass);


--
-- Name: Equipo id; Type: DEFAULT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Equipo" ALTER COLUMN id SET DEFAULT nextval('public."Equipo_id_seq"'::regclass);


--
-- Name: Mantenimiento id; Type: DEFAULT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Mantenimiento" ALTER COLUMN id SET DEFAULT nextval('public."Mantenimiento_id_seq"'::regclass);


--
-- Name: Usuario id; Type: DEFAULT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Usuario" ALTER COLUMN id SET DEFAULT nextval('public."Usuario_id_seq"'::regclass);


--
-- Data for Name: Cliente; Type: TABLE DATA; Schema: public; Owner: bitakora_db_user
--

COPY public."Cliente" (id, nombre, nit, "createdAt") FROM stdin;
1       Redes y Obras    900826705-4    2025-05-24 14:13:09.294
2       MR INGENIEROS S.A.S     804004100-3     2025-05-24 14:30:00.612
\.


--
-- Data for Name: Equipo; Type: TABLE DATA; Schema: public; Owner: bitakora_db_user
--

COPY public."Equipo" (id, nombre, tipo, serial, ubicacion, "clienteId") FROM stdin;
1       Motobomba marca BARNES  Motobomba       2209202004      ESSA â?" SubestaciÃ³n Mesa de Sol       1
2       Brazos electromecanicos BFT     BFT Phobos BT A25       BTA-001 Giron - Mr. ingenieros  2
\.


--
-- Data for Name: Mantenimiento; Type: TABLE DATA; Schema: public; Owner: bitakora_db_user
--

COPY public."Mantenimiento" (id, fecha, descripcion, "equipoId", "usuarioId") FROM stdin;
1       2025-05-24 23:20:56.152 Cliente: ESSA â?" SubestaciÃ³n Mesa de Sol\nEquipo intervenido: Motobomba marca BARNES\nNÃºmero de serie: 2209202004\n\nDiagnÃ³stico inicial:\nSe recibiÃ³ reporte de que la motobomba no generaba presiÃ³n adecuada durante su operaciÃ³n. Esto impedÃ­a el correcto suministro del sistema hidrÃ¡ulico.\n\nProcedimiento realizado:\n- Cambio del sello mecÃ¡nico, el cual presentaba signos visibles de desgaste y fuga.\n- Reemplazo de empaques deteriorados.\n- Limpieza interna de la motobomba, eliminando acumulaciones de sedimentos, residuos y Ã³xidos.\n- RevisiÃ³n del sistema elÃ©ctrico, verificando el estado del embobinado del rotor y el estator, sin evidenciarse daÃ±os.\n- RectificaciÃ³n del impulsor, eliminando suciedad adherida y rastros de Ã³xido que afectaban su desempeÃ±o.\n\nSiguiente etapa del proceso:\n- Llenado, reinstalaciÃ³n y puesta en marcha de la motobomba.\n- Ingreso al tanque para verificar el estado de la tuberÃ­a hidrÃ¡ulica interna.\n- Posible falla en la vÃ¡lvula de pie detectada.\n- VerificaciÃ³n completa de la lÃ­nea hidrÃ¡ulica, incluyendo:\n  - RevisiÃ³n de posibles fugas\n  - ComprobaciÃ³n del estado funcional de la vÃ¡lvula de pie\n  - Pruebas de estanqueidad\n\nObservaciones y recomendaciones:\nEn caso de confirmarse la falla en la vÃ¡lvula de pie, se recomienda su reemplazo inmediato para garantizar el correcto cebado del sistema y evitar daÃ±o prematuro del equipo.1       \N
2       2025-05-24 23:20:56.152 Cliente: ESSA â?" SubestaciÃ³n Mesa de Sol\nEquipo intervenido: Motobomba marca BARNES\nNÃºmero de serie: 2209202004\n\nDiagnÃ³stico inicial:\nSe recibiÃ³ reporte de que la motobomba no generaba presiÃ³n adecuada durante su operaciÃ³n. Esto impedÃ­a el correcto suministro del sistema hidrÃ¡ulico.\n\nProcedimiento realizado:\n- Cambio del sello mecÃ¡nico, el cual presentaba signos visibles de desgaste y fuga.\n- Reemplazo de empaques deteriorados.\n- Limpieza interna de la motobomba, eliminando acumulaciones de sedimentos, residuos y Ã³xidos.\n- RevisiÃ³n del sistema elÃ©ctrico, verificando el estado del embobinado del rotor y el estator, sin evidenciarse daÃ±os.\n- RectificaciÃ³n del impulsor, eliminando suciedad adherida y rastros de Ã³xido que afectaban su desempeÃ±o.\n\nSiguiente etapa del proceso:\n- Llenado, reinstalaciÃ³n y puesta en marcha de la motobomba.\n- Ingreso al tanque para verificar el estado de la tuberÃ­a hidrÃ¡ulica interna.\n- Posible falla en la vÃ¡lvula de pie detectada.\n- VerificaciÃ³n completa de la lÃ­nea hidrÃ¡ulica, incluyendo:\n  - RevisiÃ³n de posibles fugas\n  - ComprobaciÃ³n del estado funcional de la vÃ¡lvula de pie\n  - Pruebas de estanqueidad\n\nObservaciones y recomendaciones:\nEn caso de confirmarse la falla en la vÃ¡lvula de pie, se recomienda su reemplazo inmediato para garantizar el correcto cebado del sistema y evitar daÃ±o prematuro del equipo.1       \N
\.


--
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: bitakora_db_user
--

COPY public."Usuario" (id, nombre, email, password, rol) FROM stdin;
1       Admin   admin@taelco.com        $2b$10$G0yVUz5dNVGsU.x4fVRucOIdESGj89KCESvcIN1BIqIY8ChT.ykHi    ADMIN
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: bitakora_db_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
4f1f06b0-0d8e-46d8-8c2c-b65d3bcf6c8b    da93e249dc694c515cc89548f1fd3f04a8e127a586dc017c9e75fb990e3d4a47        2025-05-24 05:43:07.414343+00   20250511235522_init     \N      \N      2025-05-24 05:43:06.515261+00   1
0b08c9c0-8e94-4250-868d-008045b96461    4cc4877cc439c2e7cb8bad00ec8c1d8fe153e751194cd9dca658adc5663d3a86        2025-05-24 05:43:08.525596+00   20250515035445_relacion_usuario_mantenimiento   \N      \N      2025-05-24 05:43:07.745979+00  1
4e98686f-b745-4037-a87b-6a21e2dc413e    ddb26a7f414f00561915e87ced5cf8329c149e7125a88bacbc9434a599b9883a        2025-05-24 14:09:30.827327+00   20250524140922_add_cliente_model        \N      \N      2025-05-24 14:09:30.033341+00   1
\.


--
-- Name: Cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bitakora_db_user
--

SELECT pg_catalog.setval('public."Cliente_id_seq"', 2, true);


--
-- Name: Equipo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bitakora_db_user
--

SELECT pg_catalog.setval('public."Equipo_id_seq"', 2, true);


--
-- Name: Mantenimiento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bitakora_db_user
--

SELECT pg_catalog.setval('public."Mantenimiento_id_seq"', 2, true);


--
-- Name: Usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bitakora_db_user
--

SELECT pg_catalog.setval('public."Usuario_id_seq"', 1, true);


--
-- Name: Cliente Cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Cliente"
    ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY (id);


--
-- Name: Equipo Equipo_pkey; Type: CONSTRAINT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Equipo"
    ADD CONSTRAINT "Equipo_pkey" PRIMARY KEY (id);


--
-- Name: Mantenimiento Mantenimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Mantenimiento"
    ADD CONSTRAINT "Mantenimiento_pkey" PRIMARY KEY (id);


--
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Cliente_nit_key; Type: INDEX; Schema: public; Owner: bitakora_db_user
--

CREATE UNIQUE INDEX "Cliente_nit_key" ON public."Cliente" USING btree (nit);


--
-- Name: Equipo_serial_key; Type: INDEX; Schema: public; Owner: bitakora_db_user
--

CREATE UNIQUE INDEX "Equipo_serial_key" ON public."Equipo" USING btree (serial);


--
-- Name: Usuario_email_key; Type: INDEX; Schema: public; Owner: bitakora_db_user
--

CREATE UNIQUE INDEX "Usuario_email_key" ON public."Usuario" USING btree (email);


--
-- Name: Equipo Equipo_clienteId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Equipo"
    ADD CONSTRAINT "Equipo_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES public."Cliente"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Mantenimiento Mantenimiento_equipoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Mantenimiento"
    ADD CONSTRAINT "Mantenimiento_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES public."Equipo"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Mantenimiento Mantenimiento_usuarioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bitakora_db_user
--

ALTER TABLE ONLY public."Mantenimiento"
    ADD CONSTRAINT "Mantenimiento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: bitakora_db_user
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO bitakora_db_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO bitakora_db_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO bitakora_db_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO bitakora_db_user;


--
-- PostgreSQL database dump complete
--


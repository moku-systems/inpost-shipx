# InPost ShipX — Kryteria filtrowania zasobu `Points`

Zasób **Points** (`/v1/points`) umożliwia pobieranie listy Paczkomatów i PaczkoPunktów.  
Poniżej znajdują się wszystkie dostępne parametry filtrowania zgodnie z dokumentacją InPost.

---

## Filtry podstawowe

### `name`

Wyszukiwanie punktów po nazwie.

- Typ: `string` lub lista wartości
- Przykład: `?name=KRA010` lub `?name=KRA010,ADA01N`

### `type`

Typ punktu.

- Typ: `string` lub lista wartości
- Dostępne wartości:
  - `parcel_locker`
  - `pop`
  - `parcel_locker_only`
  - `parcel_locker_superpop`
- Przykład: `?type=parcel_locker,pop`

### `functions`

Wymagane funkcje punktu (punkt musi spełniać wszystkie).

- Typ: `string` lub lista wartości
- Przykład: `?functions=parcel,parcel_send`

### `partner_id`

Identyfikator partnera.

- Typ: `integer` lub lista wartości
- Przykład: `?partner_id=1,2`

### `is_next`

Czy punkt jest Paczkomatem NEXT.

- Typ: `boolean`
- Przykład: `?is_next=true`

### `payment_available`

Czy punkt obsługuje płatności.

- Typ: `boolean`
- Przykład: `?payment_available=true`

---

## Filtry adresowe

### `post_code`

Kod pocztowy.

- Typ: `string` lub lista wartości
- Przykład: `?post_code=11-111,22-222`

### `city`

Miasto.

- Typ: `string` lub lista wartości
- Przykład: `?city=Kraków,Warszawa`

### `province`

Województwo.

- Typ: `string` lub lista wartości
- Przykład: `?province=Małopolska,Śląskie`

---

## Filtry techniczne

### `virtual`

Wirtualność punktu.

- Typ: `integer` lub lista wartości
- Przykład: `?virtual=0,1`

### `updated_from`

Data aktualizacji od.

- Typ: `date`
- Uwaga: jeśli `updated_to` nie jest podane, data nie może być starsza niż 3 dni.
- Przykład: `?updated_from=2018-04-24`

### `updated_to`

Data aktualizacji do.

- Typ: `date`
- Wymaga `updated_from`.
- Przykład: `?updated_to=2018-04-26`

---

## Dostępność i funkcje specjalne

### `location_247`

Czy punkt jest dostępny 24/7.

- Typ: `boolean`
- Przykład: `?location_247=true`

### `supported_locker_temperatures`

Obsługiwane temperatury skrytek.

- Typ: `integer` lub lista wartości
- Dostępne: `4`, `20`
- Przykład: `?supported_locker_temperatures=20`

---

## Filtry lokalizacyjne

### `relative_point`

Współrzędne referencyjne.

- Typ: `string` (format: `lat,lng`)
- Przykład: `?relative_point=52.123,19.321`

### `relative_post_code`

Kod pocztowy referencyjny.

- Typ: `string`
- Przykład: `?relative_post_code=11-111`

### `max_distance`

Maksymalna odległość od punktu referencyjnego (metry).

- Typ: `double`
- Domyślnie: `10000`
- Maksymalnie: `50000`
- Przykład: `?relative_point=52.123,19.321&max_distance=5000`

### `limit`

Limit wyników przy filtrach lokalizacyjnych.

- Typ: `integer`
- Przykład: `?limit=10`

---

## Sortowanie

### `sort_by`

- Dostępne wartości:
  - `name`
  - `distance_to_relative_point`
  - `status`

### `sort_order`

- `asc` (domyślnie)
- `desc`

Przykład:  
`?sort_by=status&sort_order=desc`

---

## Stronicowanie

### `page`

- Typ: `integer`
- Przykład: `?page=2`

### `per_page`

- Typ: `integer`
- Domyślnie: `25`
- Maksymalnie: `500`
- Przykład: `?per_page=100`

---

## Filtrowanie pól odpowiedzi

### `fields`

Zwraca tylko wybrane pola.

- Typ: `string`
- Przykład: `?fields=name,type,location`

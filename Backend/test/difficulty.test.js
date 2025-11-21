const mockFind = jest.fn();
const mockCount = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();

jest.mock('../src/models/difficulty', () => {
  function MockDifficulty(data) {
    this.data = data;
    this.save = jest.fn().mockResolvedValue({ _id: '999', ...data });
  }
  MockDifficulty.find = mockFind;
  MockDifficulty.countDocuments = mockCount;
  MockDifficulty.findById = mockFindById;
  MockDifficulty.findByIdAndUpdate = mockFindByIdAndUpdate;
  MockDifficulty.findByIdAndDelete = mockFindByIdAndDelete;
  return MockDifficulty;
});

const Difficulty = require('../src/models/difficulty');
const difficultyController = require('../src/controllers/difficultyController');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('Controlador de dificultad (mockeado)', () => {
  afterEach(() => jest.clearAllMocks());

  test('Deberia devolver la lista de dificultades con paginacion', async () => {
    const mockItems = [
      { _id: '1', level: 'Fácil', description: 'desc1' },
      { _id: '2', level: 'Intermedio', description: 'desc2' },
    ];

    mockCount.mockResolvedValue(2);
    mockFind.mockImplementation(() => ({
      sort: () => ({ skip: () => ({ limit: () => Promise.resolve(mockItems) }) })
    }));

    const req = { query: {} };
    const res = mockRes();

    await difficultyController.list(req, res);

    expect(mockCount).toHaveBeenCalled();
    expect(mockFind).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ total: 2, data: mockItems }));
  });

  test('Deberia devolver un elemento por ID', async () => {
    const validId = '507f1f77bcf86cd799439011';
    const mockItem = { _id: validId, level: 'Fácil', description: 'desc' };
    mockFindById.mockResolvedValue(mockItem);

    const req = { params: { id: validId } };
    const res = mockRes();

    await difficultyController.get(req, res);

    expect(mockFindById).toHaveBeenCalledWith(validId);
    expect(res.json).toHaveBeenCalledWith(mockItem);
  });

  test('Deberia crear una nueva dificultad correctamente', async () => {
    const payload = { level: 'Nuevo', description: 'nuevo' };
    const req = { body: payload };
    const res = mockRes();

    await difficultyController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ level: 'Nuevo' }) }));
  });

  test('Deberia actualizar una dificultad existente por ID', async () => {
    const payload = { description: 'updated' };
    const updated = { _id: '9', level: 'Fácil', description: 'updated' };
    mockFindByIdAndUpdate.mockResolvedValue(updated);

    const req = { params: { id: '507f1f77bcf86cd799439009' }, body: payload };
    const res = mockRes();

    await difficultyController.update(req, res);

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(req.params.id, payload, { new: true, runValidators: true });
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test('Deberia eliminar una dificultad existente por ID', async () => {
    mockFindByIdAndDelete.mockResolvedValue({ _id: '507f1f77bcf86cd799439005' });

    const req = { params: { id: '507f1f77bcf86cd799439005' } };
    const res = mockRes();

    await difficultyController.remove(req, res);

    expect(mockFindByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });
});

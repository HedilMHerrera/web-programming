const mockFind = jest.fn();
const mockCount = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();

jest.mock('../models/ageRange', () => {
    function MockAgeRange(data) {
        this.data = data;
        this.save = jest.fn().mockResolvedValue({ _id: '999', ...data });
    }
    MockAgeRange.find = mockFind;
    MockAgeRange.countDocuments = mockCount;
    MockAgeRange.findById = mockFindById;
    MockAgeRange.findByIdAndUpdate = mockFindByIdAndUpdate;
    MockAgeRange.findByIdAndDelete = mockFindByIdAndDelete;
    return MockAgeRange;
});

const ageRangeController = require('../controllers/ageRangeController');

function mockRes() {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

describe('Controlador de Rangos de Edad (mockeado)', () => {
    afterEach(() => jest.clearAllMocks());

    test('Deberia devolver la lista de rangos de edad con paginacion', async () => {
        const mockItems = [
            { _id: '1', minAge: 6, maxAge: 8, description: 'Niños pequeños' },
            { _id: '2', minAge: 9, maxAge: 12, description: 'Niños' },
        ];

        mockCount.mockResolvedValue(2);
        mockFind.mockImplementation(() => ({
            sort: () => ({ skip: () => ({ limit: () => Promise.resolve(mockItems) }) })
        }));

        const req = { query: {} };
        const res = mockRes();

        await ageRangeController.list(req, res);

        expect(mockCount).toHaveBeenCalled();
        expect(mockFind).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ total: 2, data: mockItems }));
    });

    test('Deberia devolver un elemento por ID', async () => {
        const validId = '507f1f77bcf86cd799439011';
        const mockItem = { _id: validId, minAge: 13, maxAge: 17, description: 'Adolescentes' };
        mockFindById.mockResolvedValue(mockItem);

        const req = { params: { id: validId } };
        const res = mockRes();

        await ageRangeController.get(req, res);

        expect(mockFindById).toHaveBeenCalledWith(validId);
        expect(res.json).toHaveBeenCalledWith(mockItem);
    });

    test('Deberia crear un nuevo rango de edad correctamente', async () => {
        const payload = { minAge: 18, maxAge: 25, description: 'Jovenes adultos' };
        const req = { body: payload };
        const res = mockRes();

        await ageRangeController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ minAge: 18, maxAge: 25 }));
    });

    test('Deberia actualizar un rango de edad existente por ID', async () => {
        const payload = { description: 'Actualizado' };
        const updated = { _id: '9', minAge: 26, maxAge: 40, description: 'Actualizado' };
        mockFindByIdAndUpdate.mockResolvedValue(updated);

        const req = { params: { id: '507f1f77bcf86cd799439009' }, body: payload };
        const res = mockRes();

        await ageRangeController.update(req, res);

        expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(req.params.id, payload, { new: true, runValidators: true });
        expect(res.json).toHaveBeenCalledWith(updated);
    });

    test('Deberia eliminar un rango de edad existente por ID', async () => {
        mockFindByIdAndDelete.mockResolvedValue({ _id: '507f1f77bcf86cd799439005' });

        const req = { params: { id: '507f1f77bcf86cd799439005' } };
        const res = mockRes();

        await ageRangeController.remove(req, res);

        expect(mockFindByIdAndDelete).toHaveBeenCalledWith(req.params.id);
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });
});

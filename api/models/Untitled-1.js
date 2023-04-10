app.get('/employees/:id/salary/:year/:month', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    const monthlyHours = employee.monthlyHours.find(m => m.year === parseInt(req.params.year) && m.month === parseInt(req.params.month));

    if (!monthlyHours) {
      return res.status(404).send('Hours not found for specified month and year');
    }

    const salary = employee.hourlyRate * monthlyHours.hours;

    res.send({ salary });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
